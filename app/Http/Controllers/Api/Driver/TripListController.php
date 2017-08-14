<?php
namespace App\Http\Controllers\Api\Driver;

use App\Http\Controllers\Controller;
use App\Http\Requests\GetTripsListRequest;
use App\Services\TripsListService;
use Illuminate\Support\Facades\Auth;

class TripListController extends Controller
{
    protected $service;

    public function __construct(TripsListService $service)
    {
        $this->service = $service;
    }

    /**
     * Return all user trips.
     * @param GetTripsListRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(GetTripsListRequest $request)
    {
        return response()->json(
            $this->service->getUserTrips($request, Auth::user())
        );
    }

    /**
     * Return past user trips.
     * @param GetTripsListRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function past(GetTripsListRequest $request)
    {
        return response()->json(
            $this->service->getPastUserTrips($request,Auth::user())
        );
    }

    /**
     * Return upcoming user trips.
     * @param GetTripsListRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function upcoming(GetTripsListRequest $request)
    {
        return response()->json(
            $this->service->getUpcomingUserTrips($request, Auth::user())
        );
    }
}