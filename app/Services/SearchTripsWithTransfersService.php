<?php

namespace App\Services;

use App\Models\Route;
use App\Repositories\TripRepository;
use App\Services\Helpers\RouteCombinationsFinder;
use App\Services\Requests\SearchTripRequest;
use RFHaversini\Distance;

class SearchTripsWithTransfersService
{
    private $tripRepository;
    private $possibleTripsIds;
    private $searchRequest;

    public function __construct(TripRepository $tripRepository)
    {
        $this->tripRepository = $tripRepository;
    }

    /**
     * @param  SearchTripRequest $request
     * @return \Illuminate\Support\Collection
     * TODO Price filter, routes must be free check, pagination and sort
     */
    public function search(SearchTripRequest $request)
    {
        $this->searchRequest = $request;
        $this->possibleTripsIds = $this->tripRepository->search()
            ->initialize()
            ->setIsAnimalsAllowed($request->getIsAnimalsAllowed())
            ->setLuggageSize($request->getLuggageSize())
            ->setRating($request->getRating())
            ->getResult()->pluck('id')->toArray();

        if (count($this->possibleTripsIds) <= 0) {
            return collect([]);
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

        $routeGroups = $this->filterByRestrictions($routeGroups);

        return $routeGroups;
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
        )->where('start_at', '>', $this->searchRequest->getStartAt())->with(['trip.user', 'bookings'])->get();
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
        )->where('start_at', '>', $this->searchRequest->getStartAt())->get();
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
                    'from_lat',
                    'from_lng',
                    $this->searchRequest->getToLat(),
                    $this->searchRequest->getToLng(),
                    $distanceBetweenStartAndEndPoints
                );
            });
        })->whereNotIn('id', $possibleStartRoutes->pluck('id')->toArray())
            ->where('start_at', '>', $this->searchRequest->getStartAt())
            ->with(['trip.user', 'bookings'])
            ->get();
    }

    /**
     * @return Route
     */
    private function routesQuery()
    {
        return Route::whereIn('trip_id', $this->possibleTripsIds);
    }

    /**
     * @param $routeGroups
     * @return mixed
     */
    private function filterByRestrictions($routeGroups)
    {
        return $routeGroups->filter(function ($routeGroup) {
            if (!$this->searchRequest->getSeats()) {
                return true;
            }

            $filtered = $routeGroup->getRoutes()->filter(function($route) {
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

            if (!$minPrice && !$maxPrice) {
                return true;
            }

            $routeGroupPrice = $routeGroup->getRoutes()->reduce(function($carry, $route) {
                return $carry + $route->trip->price;
            });

            return $routeGroupPrice >= $minPrice && $routeGroupPrice <= $maxPrice;
        });
    }
}
