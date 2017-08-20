<?php

namespace App\Repositories;


use App\Services\Requests\SearchTripRequest;
use App\Models\Trip;
use Carbon\Carbon;
use Illuminate\Routing\Route;
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
     * @param SearchTripRequest $request
     * @return mixed
     */
    public function search(SearchTripRequest $request){

        $sql_start_point = $this->haversinusSql("from_lat",
                                                "from_lng",
                                                $request->getFromLat(),
                                                $request->getFromLng(),
                                                "distance_from");

        $sql_end_point = $this->haversinusSql(  "to_lat",
                                                "to_lng",
                                                $request->getToLat(),
                                                $request->getToLng(),
                                                "distance_to");

        $time = Carbon::createFromTimestampUTC($request->getStartAt());

        $sql = "SELECT *, $sql_start_point, $sql_end_point 
                FROM trips
                JOIN routes on trips.id = routes.trip_id
                HAVING start_at >=  \"$time\" AND distance_from < 10 AND distance_to < 10";

        return DB::select($sql);
    }

    /**
     * @param $start_lat
     * @param $start_lng
     * @param $end_lat
     * @param $end_lng
     * @param $column_name
     * @return string
     */
    private function haversinusSql($start_lat, $start_lng, $end_lat, $end_lng, $column_name)
    {
        $sql = "round(6371 * 2 * ASIN(SQRT(POWER(SIN((`$start_lat` - $end_lat ) *
                pi()/180 / 2), 2) + COS(`$start_lat` * pi()/180) * COS($end_lat * pi() / 180) *
                POWER(SIN((`$start_lng` - ($end_lng)) * pi()/180 / 2), 2))),1)  
                as $column_name";

        return $sql;
    }

}
