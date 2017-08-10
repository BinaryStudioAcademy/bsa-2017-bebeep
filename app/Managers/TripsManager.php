<?php
namespace App\Managers;

use App\Managers\Contracts\TripsManager as InterfaceTripsManager;
use Illuminate\Support\Facades\DB;

class TripsManager implements InterfaceTripsManager
{

    /** @inheritdoc */
    public function userTrips(int $id)
    {
        return DB::table('trips')
            ->join('routes', 'routes.trip_id', '=', 'trips.id')
            ->join('vehicles', 'trips.vehicle_id', '=', 'vehicles.id')
            ->where('trips.user_id', '=', $id)
            ->get(['trips.id','from', 'to', 'brand', 'model', 'start_at', 'end_at']);
    }
}