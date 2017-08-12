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
        $userId = 1; //TODO: change user ID
        try {
            switch ($request->getFilter()){
                case 'past':
                    $result = $this->service->getPastUserTrips($userId);
                    break;
                case 'upcoming':
                    $result = $this->service->getUpcomingUserTrips($userId);
                    break;
                default:
                    $result = $this->service->getUserTrips($userId);
            }
        }catch (UserNotHaveTrips $e){
            $result = [];
        }

        return response()->json($result);
    }
}