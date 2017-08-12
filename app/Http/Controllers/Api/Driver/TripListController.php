<?php
namespace App\Http\Controllers\Api\Driver;

use App\Exceptions\Trip\UserNotHaveTrips;
use App\Http\Controllers\Controller;
use App\Http\Requests\GetTripsListRequest;
use App\Services\TripsListService;

class TripListController extends Controller
{
    protected $service;

    public function __construct(TripsListService $service)
    {
        $this->service = $service;
    }

    /**
     * Return user trips.
     * @param GetTripsListRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(GetTripsListRequest $request)
    {
        try {
            $userId = 1; //TODO: change user ID
            $result = $this->service->getUserTrips($userId);
        }catch (UserNotHaveTrips $e){
            return response()->json([]);
        }

        return response()->json($result);
    }
}