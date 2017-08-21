<?php

namespace App\Repositories;

use App\Models\Trip;
use Illuminate\Support\Facades\DB;
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
     * Search trips.
     *
     * @param array $attributes
     *
     * @return mixed
     */
    public function search(array $attributes)
    {
        [
            'start_at' => $startAt,
            'from_lat' => $fromLat,
            'from_lng' => $fromLng,
            'to_lat' => $toLat,
            'to_lng' => $toLng,
        ] = $attributes;

        $startPoint = $this->haversinusSql(
            'from_lat',
            'from_lng',
            $fromLat,
            $fromLng,
            'distance_from'
        );

        $endPoint = $this->haversinusSql(
            'to_lat',
            'to_lng',
            $toLat,
            $toLng,
            'distance_to'
        );

        $sql = "SELECT * FROM trips
                INNER JOIN routes on trips.id = routes.trip_id
                WHERE start_at >= '$startAt'
                AND $startPoint < 10 AND $endPoint < 10";

        //return DB::select($sql);

        return DB::table('trips')
            ->join('routes', 'trips.id', '=', 'routes.trip_id')
            ->select('*')
            ->where([
                ['start_at', '>=', $startAt],
                [DB::raw($startPoint), '<', 10],
                [DB::raw($endPoint), '<', 10],
            ])
            ->get();
    }

    /**
     * Calculate the distance between two points.
     *
     * Calculate the distance between two points,
     * given their longitude and latitude, using the Haversin formula.
     *
     * @param string $startLat
     * @param string $startLng
     * @param float $endLat
     * @param float $endLng
     * @param string $columnName
     *
     * @return string
     */
    private function haversinusSql(
        string $startLat,
        string $startLng,
        float $endLat,
        float $endLng
    ) : string {

        $earthRadius = 6371;

        return "ROUND(2 * $earthRadius * ASIN(SQRT(
            POWER(SIN(RADIANS(routes.`$startLat` - $endLat) / 2), 2) +
            COS(RADIANS(routes.`$startLat`)) * COS(RADIANS($endLat)) *
            POWER(SIN(RADIANS(routes.`$startLng` - $endLng) / 2), 2)
        )), 1)";
    }
}
