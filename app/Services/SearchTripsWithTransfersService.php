<?php

namespace App\Services;

use App\Models\Route;
use App\Repositories\TripRepository;
use App\Services\Requests\SearchTripRequest;

class SearchTripsWithTransfersService
{
    const DISTANCE_TO = 20;
    const DISTANCE_FROM = 20;

    /**
     * @param  SearchTripRequest $request
     * @return int
     */
    public function search(SearchTripRequest $request)
    {
        $possibleStartRoutes = Route::haversine(
            'from_lat',
            'from_lng',
            $request->getFromLat(),
            $request->getFromLng()
        )->get()->pluck('id')->toArray();

        $possibleEndRoutes = Route::haversine(
            'to_lat',
            'to_lng',
            $request->getToLat(),
            $request->getToLng()
        )->get()->pluck('id')->toArray();

        return [$possibleStartRoutes, $possibleEndRoutes];
    }
}
