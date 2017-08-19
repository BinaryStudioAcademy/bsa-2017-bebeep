<?php

namespace App\Repositories;

use App\Http\Requests\SearchTripRequest;
use App\Models\Trip;
use Illuminate\Routing\Route;
use Prettus\Repository\Eloquent\BaseRepository;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TripRepository extends BaseRepository
{
    public $from_lat;
    public $from_lng;
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

    public function search(SearchTripRequest $request){

        $this->from_lat = $request->lat;
        $this->from_lng = $request->lng;

        $trips = DB::table('trips')
            ->where('start_at',Carbon::createFromTimestampUTC($request->start_at))
            ->join('routes', 'trips.id', '=', 'routes.trip_id')
            ->whereExists(function ($query) {
                $query->select(DB::raw("round(6371 * 2 * ASIN(SQRT(POWER(SIN((`from_lat` - $this->from_lat ) *
                                        pi()/180 / 2), 2) + COS(`from_lat` * pi()/180) * COS($this->from_lat * pi() / 180) *
                                        POWER(SIN((`from_lng` - ($this->from_lng)) * pi()/180 / 2), 2))),1)  
                                        as distance from routes"))
                      ->having('distance','>',' 10');
            })
            ->get();

        return $trips ;
    }
}
