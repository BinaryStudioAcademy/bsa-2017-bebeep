<?php

namespace App\Repositories;

use App\Models\Trip;
use App\Models\Route;
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
     * @param Trip $trip
     * @return Trip
     */
    public function softDelete(Trip $trip)
    {
        $trip->delete();

        return $trip;
    }

    /**
     * @param Trip $trip
     * @return Trip
     */
    public function restore(Trip $trip)
    {
        $trip->restore();

        return $trip;
    }

    /**
     * Update trip
     *
     * @param Trip $trip
     * @param $attributes
     * @return Trip
     */
    public function updateTrip(Trip $trip, $attributes)
    {
        $trip->fill($attributes)->save();

        return $trip;
    }

    /**
     * Find trip by id
     *
     * @param $id
     * @return mixed
     */
    public function findTripById($id)
    {
        return $this->find($id);
    }
}
