<?php
namespace App\Http\Controllers\Api\Driver;

use App\Http\Controllers\Controller;
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
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $result = $this->service->getUserTrips($request['id']);
        if(!isset($result))
            return response()->json(['error' => 'trips not found'], 404);
        return response()->json($result);
    }
}