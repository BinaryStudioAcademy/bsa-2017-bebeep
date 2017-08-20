<?php

namespace App\Repositories;

use App\Services\Requests\SearchTripRequest;
use App\Models\Trip;
use Prettus\Repository\Eloquent\BaseRepository;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

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
                                                $request->from_lat,
                                                $request->from_lng,
                                                "distance_from");

        $sql_end_point = $this->haversinusSql(  "to_lat",
                                                "to_lng",
                                                $request->to_lat,
                                                $request->to_lng,
                                                "distance_to");

        $time = Carbon::createFromTimestampUTC($request->start_at);

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
    private function haversinusSql($start_lat, $start_lng, $end_lat, $end_lng, $column_name){
        $sql = "round(6371 * 2 * ASIN(SQRT(POWER(SIN((`$start_lat` - $end_lat ) *
                pi()/180 / 2), 2) + COS(`$start_lat` * pi()/180) * COS($end_lat * pi() / 180) *
                POWER(SIN((`$start_lng` - ($end_lng)) * pi()/180 / 2), 2))),1)  
                as $column_name";

        return $sql;
    }
}
