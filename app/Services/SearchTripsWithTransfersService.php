<?php

namespace App\Services;

use App\Models\Route;
use App\Services\Helpers\RouteCombinationsFinder;
use App\Services\Requests\SearchTripRequest;
use RFHaversini\Distance;

class SearchTripsWithTransfersService
{
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
        )->get();

        $possibleEndRoutes = Route::haversine(
            'to_lat',
            'to_lng',
            $request->getToLat(),
            $request->getToLng()
        )->get();

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
        })->whereNotIn('id', $possibleStartRoutes->pluck('id')->toArray())->get();

        $combinator = new RouteCombinationsFinder($possibleStartRoutes, $possibleInnerRoutes, $possibleEndRoutes);
        $routes = $combinator->find();

        return $routes;
    }
}
