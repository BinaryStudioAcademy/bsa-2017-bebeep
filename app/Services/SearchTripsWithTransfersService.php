<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\Route;
use Money\Currency;
use RFHaversini\Distance;
use App\Repositories\TripRepository;
use App\Services\Requests\SearchTripRequest;
use App\Services\Helpers\RouteCombinationsFinder;

class SearchTripsWithTransfersService
{
    private $tripRepository;
    private $possibleTripsIds;
    private $searchRequest;
    private $searchCurrency;

    public function __construct(TripRepository $tripRepository)
    {
        $this->tripRepository = $tripRepository;
    }

    /**
     * @param  SearchTripRequest $request
     * @return array
     */
    public function search(SearchTripRequest $request)
    {
        $this->searchRequest = $request;
        $this->searchCurrency = \App\Models\Currency::find($this->searchRequest->getCurrencyId());
        $this->possibleTripsIds = $this->tripRepository->search()
            ->initialize()
            ->setIsAnimalsAllowed($request->getIsAnimalsAllowed())
            ->setLuggageSize($request->getLuggageSize())
            ->setRating($request->getRating())
            ->paginate(9999, 0)
            ->getResult()->pluck('id')->unique()->toArray();

        if (count($this->possibleTripsIds) <= 0) {
            return [
                'data' => [],
                'meta' => $this->getMeta(collect(), collect()),
            ];
        }

        $possibleStartRoutes = $this->getPossibleStartRoutes();
        $possibleEndRoutes = $this->getPossibleEndRoutes();

        $distanceBetweenStartAndEndPoints = Distance::toKilometers(
            $request->getFromLat(),
            $request->getFromLng(),
            $request->getToLat(),
            $request->getToLng()
        );

        $possibleInnerRoutes = $this->getPossibleInnerRoutes(
            $distanceBetweenStartAndEndPoints,
            $possibleStartRoutes
        );

        $combinator = new RouteCombinationsFinder($possibleStartRoutes, $possibleInnerRoutes, $possibleEndRoutes);
        $routeGroups = $combinator->find($request->getTransfers() ?? 5);

        $sortMethod = $this->searchRequest->getOrder() === 'asc' ? 'sortBy' : 'sortByDesc';
        $filteredAndSortedRouteGroups = $this->filterByRestrictions($routeGroups)->{$sortMethod}(function ($routeGroup) {
            $startRoute = $routeGroup->getRoutes()->first();

            if ($this->searchRequest->getSort() === 'price') {
                return $startRoute->trip->price;
            }

            if ($this->searchRequest->getSort() === 'start_at') {
                return $startRoute->start_at;
            }

            return true;
        })->map(function($routeGroup) {
            $routeGroup->getRoutes()->map(function($route) {
                $route->priceInCurrency = $route->priceInCurrency($this->searchCurrency);
            });

            return $routeGroup;
        });

        return [
            'data' => $filteredAndSortedRouteGroups->forPage($this->searchRequest->getPage(), $this->searchRequest->getLimit())->values(),
            'meta' => $this->getMeta($routeGroups, $filteredAndSortedRouteGroups),
        ];
    }

    /**
     * @return mixed
     */
    private function getPossibleStartRoutes()
    {
        return $this->routesQuery()->haversine(
            'from_lat',
            'from_lng',
            $this->searchRequest->getFromLat(),
            $this->searchRequest->getFromLng()
        )->with(['trip.user', 'bookings'])->get();
    }

    /**
     * @return mixed
     */
    private function getPossibleEndRoutes()
    {
        return $this->routesQuery()->haversine(
            'to_lat',
            'to_lng',
            $this->searchRequest->getToLat(),
            $this->searchRequest->getToLng()
        )->get();
    }

    /**
     * @param $distanceBetweenStartAndEndPoints
     * @param $possibleStartRoutes
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Support\Collection|static[]
     */
    private function getPossibleInnerRoutes($distanceBetweenStartAndEndPoints, $possibleStartRoutes)
    {
        return $this->routesQuery()->where(function ($query) use ($distanceBetweenStartAndEndPoints) {
            return $query->where(function ($query) use ($distanceBetweenStartAndEndPoints) {
                return $query->haversine(
                    'from_lat',
                    'from_lng',
                    $this->searchRequest->getFromLat(),
                    $this->searchRequest->getFromLng(),
                    $distanceBetweenStartAndEndPoints
                );
            })->orWhere(function ($query) use ($distanceBetweenStartAndEndPoints) {
                return $query->haversine(
                    'to_lat',
                    'to_lng',
                    $this->searchRequest->getToLat(),
                    $this->searchRequest->getToLng(),
                    $distanceBetweenStartAndEndPoints
                );
            });
        })->whereNotIn('id', $possibleStartRoutes->pluck('id')->toArray())
            ->with(['trip.user', 'bookings'])
            ->get();
    }

    /**
     * @return Route
     */
    private function routesQuery()
    {
        $date = $this->searchRequest->getStartAt();
        $minHourOffset = $this->searchRequest->getMinTime();
        $maxHourOffset = $this->searchRequest->getMaxTime();

        $dayStart = clone $date;
        $dayStart->hour += $minHourOffset > 0 && $minHourOffset < $maxHourOffset ? $minHourOffset - 1 : 0;

        $dayEnd = clone $date;
        $dayEnd->hour += $maxHourOffset < 25 && $minHourOffset < $maxHourOffset ? $maxHourOffset : 24;

        if ($dayStart->timestamp < Carbon::now()->timestamp) {
            $dayStart = Carbon::now();
        }

        return Route::whereIn('trip_id', $this->possibleTripsIds)
            ->where('start_at', '>=', $dayStart)
            ->where('start_at', '<=', $dayEnd);
    }

    /**
     * @param $routeGroups
     * @return mixed
     */
    private function filterByRestrictions($routeGroups)
    {
        return $routeGroups->filter(function ($routeGroup) {
            if (! $this->searchRequest->getSeats()) {
                return true;
            }

            $filtered = $routeGroup->getRoutes()->filter(function ($route) {
                $seats = $this->searchRequest->getSeats();
                $availableSeats = $route->available_seats;

                if ($seats === 4) {
                    return $availableSeats >= 4;
                }

                return $availableSeats === $seats;
            });

            return $filtered->count() === $routeGroup->getRoutes()->count();
        })->filter(function ($routeGroup) {
            $minPrice = (int) $this->searchRequest->getMinPrice();
            $maxPrice = (int) $this->searchRequest->getMaxPrice();

            if (! $minPrice && ! $maxPrice) {
                return true;
            }

            $routeGroupPrice = $routeGroup->getRoutes()->reduce(function ($carry, $route) {
                return $carry + $route->priceInCurrency($this->searchCurrency);
            });

            return $routeGroupPrice >= $minPrice && $routeGroupPrice <= $maxPrice;
        });
    }

    /**
     * @param $routeGroups
     * @param $filteredRouteGroups
     * @return array
     */
    private function getMeta($routeGroups, $filteredRouteGroups)
    {
        $routeGroupsPrices = $routeGroups->map(function ($routeGroup) {
            $routeGroupPrice = $routeGroup->getRoutes()->reduce(function ($carry, $route) {
                return $carry + $route->priceInCurrency($this->searchCurrency);
            });

            return $routeGroupPrice;
        });

        return [
            'price' => [
                'min' => $routeGroupsPrices->min(),
                'max' => $routeGroupsPrices->max(),
            ],
            'total' => $filteredRouteGroups->count(),
        ];
    }
}
