<?php
namespace App\Repositories;

use App\Models\Trip;
use Illuminate\Support\Collection;
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
        $trip->push();
        return $trip;
    }

    /**
     * Data about all user trips.
     * @param $userId
     * @return Collection
     */
    public function getAllTrips($userId) :Collection
    {
        $trips = Trip::where('trips.user_id','=',$userId)->
                join('routes', 'routes.trip_id', '=', 'trips.id')->
                join('vehicles', 'trips.vehicle_id', '=', 'vehicles.id')->
                get(['trips.id','from', 'to', 'brand', 'model', 'start_at', 'end_at']);

        return $trips;
    }

    /**
     * Data about past user trips.
     * @param $userId
     * @return Collection
     */
    public function getPastTrips($userId) :Collection
    {
        $pastTrips = Trip::where('trips.user_id','=',$userId)->
                whereDate('end_at', '<=',new \DateTime())->
                join('routes', 'routes.trip_id', '=', 'trips.id')->
                join('vehicles', 'trips.vehicle_id', '=', 'vehicles.id')->
                get(['trips.id','from', 'to', 'brand', 'model', 'start_at', 'end_at']);

        return $pastTrips;
    }

    /**
     * Data about upcoming user trips.
     * @param $userId
     * @return Collection
     */
    public function getUpcomingTrips($userId)  :Collection
    {
        $upcomingTrips = Trip::where('trips.user_id','=',$userId)->
                whereDate('end_at', '>',new \DateTime())->
                join('routes', 'routes.trip_id', '=', 'trips.id')->
                join('vehicles', 'trips.vehicle_id', '=', 'vehicles.id')->
                get(['trips.id','from', 'to', 'brand', 'model', 'start_at', 'end_at']);

        return $upcomingTrips;
    }

}