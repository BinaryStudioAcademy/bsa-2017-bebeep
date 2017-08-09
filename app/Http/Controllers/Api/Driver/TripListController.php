<?php
namespace App\Http\Controllers\Api\Driver;

use App\Http\Controllers\Controller;
use App\Http\Requests\GetTripsListRequest;
use App\Services\TripsListService;
use Illuminate\Http\Request;

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
        $userId = $request->getUserId();
        $result = $this->service->getUserTrips($userId);
        if( count($result) == 0 )
            return response()->json(['error' => 'trips not found'], 404);
        return response()->json($result);
    }
}