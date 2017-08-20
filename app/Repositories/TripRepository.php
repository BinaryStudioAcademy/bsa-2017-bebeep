<?php

namespace App\Repositories;

use Carbon\Carbon;
use App\Models\Trip;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\SearchTripRequest;
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

    public function search(array $attributes)
    {
        [
            'start_at' => $startAt,
            'from_lat' => $fromLat,
            'from_lng' => $fromLng,
            'to_lat' => $toLat,
            'to_lng' => $toLng,
        ] = $attributes;

        /*print_r($attributes);
        exit;*/

        $haverSinus = $this->haverSinus($fromLat, $fromLng, $toLat, $toLng);

        $trips = DB::table('trips')
            ->where('start_at', '>=', $startAt)
            ->join('routes', 'trips.id', '=', 'routes.trip_id')
            ->whereExists(function ($query) use ($haverSinus) {
                $query->select(DB::raw( $haverSinus ));
            })
            ->get();

        return $trips;
    }

    private function haverSinus(float $fromLat, float $fromLng, float $toLat, float $toLng)
    {
        $tableName = 'routes';
        $earthRadius = 6371;
        $distanceMax = 10;

        return "
CEIL(2 * $earthRadius * ASIN(SQRT(
    POW(SIN((RADIANS($toLat - $fromLat)) / 2), 2) +
    COS(RADIANS($fromLat)) * COS(RADIANS($toLat)) *
    POW(SIN((RADIANS($toLng - $fromLng)) / 2), 2)
))) as 'distance' FROM $tableName HAVING 'distance' < $distanceMax";
    }
}
