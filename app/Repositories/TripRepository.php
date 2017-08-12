<?php

namespace App\Repositories;

use Illuminate\Support\Collection;
use Prettus\Repository\Eloquent\BaseRepository;
use App\Models\Trip;

class TripRepository extends BaseRepository {

    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Trip::class;
    }

    /**
     * Data about all user trips.
     * @param $userId
     * @return \Illuminate\Support\Collection
     */
    public function getAllTrips($userId) :Collection
    {
        $trips = Trip::where('trips.user_id','=',$userId)->
            join('routes', 'routes.trip_id', '=', 'trips.id')->
            join('vehicles', 'trips.vehicle_id', '=', 'vehicles.id')->
            get(['trips.id','from', 'to', 'brand', 'model', 'start_at', 'end_at']);

        return $trips;
    }

    public function getPastTrips($userId) :Collection
    {
        $pastTrips = Trip::where('trips.user_id','=',$userId)->
            whereDate('start_at', '<=',new \DateTime())->
        join('routes', 'routes.trip_id', '=', 'trips.id')->
        join('vehicles', 'trips.vehicle_id', '=', 'vehicles.id')->
        get(['trips.id','from', 'to', 'brand', 'model', 'start_at', 'end_at']);

        return $pastTrips;
    }

    public function getUpcomingTrips($userId) :Collection
    {
        $pastTrips = Trip::where('trips.user_id','=',$userId)->
        whereDate('start_at', '>',new \DateTime())->
        join('routes', 'routes.trip_id', '=', 'trips.id')->
        join('vehicles', 'trips.vehicle_id', '=', 'vehicles.id')->
        get(['trips.id','from', 'to', 'brand', 'model', 'start_at', 'end_at']);

        return $pastTrips;
    }
}