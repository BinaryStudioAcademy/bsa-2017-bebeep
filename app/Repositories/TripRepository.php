<?php

namespace App\Repositories;

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
     * Search trips.
     *
     * @param array $attributes
     *
     * @return mixed
     */
    public function findByCoordinate(float $startLat, float $startLng, float $endLat, float $endLng, Carbon $startAt)
    {
        /** @var Carbon $endSearchDay */
        $endSearchDay = clone $startAt;
        $endSearchDay->addDay();

        return DB::table('trips')
            ->addSelect('trips.*')
            ->addSelect('routes_from.from as from')
            ->addSelect('routes_to.to as to')
            ->addSelect(DB::raw(sprintf('%s, %s ',
                $this->haversineSql('routes_from', 'from_lat', 'from_lng', $startLat, $startLng, 'distance_from'),
                $this->haversineSql('routes_to', 'to_lat', 'to_lng', $endLat, $endLng, 'distance_to')
            )))
            ->join('routes as routes_from', 'trips.id', '=', 'routes_from.trip_id')
            ->join('routes as routes_to', 'trips.id', '=', 'routes_to.trip_id')
            ->where('trips.start_at', '>=', $startAt)
            ->where('trips.start_at', '<', $endSearchDay)
            ->having('distance_from', '<', self::DISTANCE_FROM)
            ->having('distance_to', '<', self::DISTANCE_TO)
            ->orderBy('distance_from', 'asc')
            ->get();
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
    private function haversineSql($tableName, $startLat, $startLng, $endLat, $endLng, $column_name): string
    {
        return "ROUND(2 * ".self::EARTH_RADIUS_KM." * ASIN(SQRT( ".
                "POWER(SIN(RADIANS(`$tableName`.`$startLat` - $endLat) / 2), 2) + ".
                "COS(RADIANS(`$tableName`.`$startLat`)) * COS(RADIANS($endLat)) * ".
                "POWER(SIN(RADIANS(`$tableName`.`$startLng` - $endLng) / 2), 2) ".
                ")), 1) as `$column_name`";
    }
}
