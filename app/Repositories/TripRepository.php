<?php

namespace App\Repositories;

use App\Repositories\Helpers\SearchResult;
use Carbon\Carbon;
use App\Models\Trip;
use Illuminate\Support\Facades\DB;
use Prettus\Repository\Eloquent\BaseRepository;

class TripRepository extends BaseRepository
{
    const DISTANCE_TO = 10;
    const DISTANCE_FROM = 10;
    const EARTH_RADIUS_KM = 6371;

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
     * @return SearchResult
     */
    public function search() : SearchResult
    {
        return new SearchResult();
    }
}
