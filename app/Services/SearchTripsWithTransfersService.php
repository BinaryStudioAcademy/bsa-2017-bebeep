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

    public function __construct(TripRepository $tripRepository)
    {
        $this->tripRepository = $tripRepository;
    }

    /**
     * @param  SearchTripRequest $request
     * @return \Illuminate\Support\Collection
     */
    public function search(SearchTripRequest $request)
    {
        $possibleTripsIds = $this->tripRepository->search()
            ->initialize()
            ->setIsAnimalsAllowed($request->getIsAnimalsAllowed())
            ->setLuggageSize($request->getLuggageSize())
            ->setSeats($request->getSeats())
            ->setRating($request->getRating())
            ->getResult()->pluck('id')->toArray();

        if (count($possibleTripsIds) <= 0) {
            return collect([]);
        }

        $possibleStartRoutes = Route::haversine(
            'from_lat',
            'from_lng',
            $request->getFromLat(),
            $request->getFromLng()
        )->whereIn('trip_id', $possibleTripsIds)->where('start_at', '>', $request->getStartAt())->with('trip')->get();

        $possibleEndRoutes = Route::haversine(
            'to_lat',
            'to_lng',
            $request->getToLat(),
            $request->getToLng()
        )->whereIn('trip_id', $possibleTripsIds)->where('start_at', '>', $request->getStartAt())->get();

        $distance = Distance::toKilometers(
            $request->getFromLat(),
            $request->getFromLng(),
            $request->getToLat(),
            $request->getToLng()
        );

        $possibleInnerRoutes = Route::where(function($query) use ($request, $distance) {
            return $query->where(function($query) use ($request, $distance) {
                return $query->haversine(
                    'from_lat',
                    'from_lng',
                    $request->getFromLat(),
                    $request->getFromLng(),
                    $distance
                );
            })->orWhere(function($query) use ($request, $distance) {
                return $query->haversine(
                    'from_lat',
                    'from_lng',
                    $request->getToLat(),
                    $request->getToLng(),
                    $distance
                );
            });
        })->whereIn('trip_id', $possibleTripsIds)
            ->whereNotIn('id', $possibleStartRoutes->pluck('id')->toArray())
            ->where('start_at', '>', $request->getStartAt())
            ->with('trip')
            ->get();

        $combinator = new RouteCombinationsFinder($possibleStartRoutes, $possibleInnerRoutes, $possibleEndRoutes);
        $routeGroups = $combinator->find($request->getTransfers() ?? 5);

        return $routeGroups;
    }
}
