<?php

namespace App\Repositories;

use App\Models\Route;
use App\Models\Trip;
use Prettus\Repository\Eloquent\BaseRepository;

class TripRepository extends BaseRepository
{
    /**
     * @return string
     */
    public function model()
    {
        return Trip::class;
    }

    /**
     * @param Trip $trip
     * @return Trip
     */
    public function save(Trip $trip)
    {
        $trip->save();

        return $trip;
    }

    /**
     * @param Trip $trip
     * @param Route $route
     * @return Route
     */
    public function addRoute(Trip $trip, Route $route)
    {
        $route->trip_id = $trip->id;
        $route->save();

        return $route;
    }
}