<?php

namespace App\Repositories;

use App\Models\Trip;
use Carbon\Carbon;
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


//        $endSearchDay = clone $startAt;
        $endSearchDay = Carbon::createFromFormat('Y-m-d', $startAt);

//        $endSearchDay = $endSearchDay->endOfDay();
        $endSearchDay = $endSearchDay->addDay();

        $sql_start_point = $this->haversineSql(
            "from_lat",
            "from_lng",
            $fromLat,
            $fromLng,
            'distance_from'
        );


        $sql_end_point = $this->haversineSql(
            "to_lat",
            "to_lng",
            $toLat,
            $toLng,
            "distance_to"
        );

        $sql = "SELECT *, trips.id as trips_id,
                    $sql_start_point, 
                    $sql_end_point 
                FROM trips
                JOIN routes on trips.id = routes.trip_id
                JOIN users on trips.user_id = users.id
                HAVING start_at >=  \"$startAt\" 
                  AND start_at < \"$endSearchDay\"
                  AND distance_from < 10 
                  AND distance_to < 10
                ORDER BY distance_from";

        return DB::select($sql);
    }

    /**
     * * Calculate the distance between two points.
     *
     * @param $startLat
     * @param $startLng
     * @param $endLat
     * @param $endLng
     * @param $column_name
     * @return string
     */
    private function haversineSql($startLat, $startLng, $endLat, $endLng, $column_name): string
    {
        $earthRadius = 6371;

        return "ROUND(2 * $earthRadius * ASIN(SQRT(
                POWER(SIN(RADIANS(routes.`$startLat` - $endLat) / 2), 2) +
                COS(RADIANS(routes.`$startLat`)) * COS(RADIANS($endLat)) *
                POWER(SIN(RADIANS(routes.`$startLng` - $endLng) / 2), 2)
                )), 1) as $column_name";
    }
}
