<?php

namespace App\Http\Controllers;

use App\Exceptions\Vehicle\VehicleSeatsNotAvailableException;
use App\Http\Requests\CreateTripRequest;
use App\Services\TripsService;

class TripsController extends Controller
{
    private $tripsService;

    public function __construct(TripsService $tripsService)
    {
        $this->tripsService = $tripsService;
    }

    /**
     * @param CreateTripRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(CreateTripRequest $request)
    {
        try {
            $trip = $this->tripsService->create($request);
        } catch (VehicleSeatsNotAvailableException $e) {
            return response()->json(['seats' => ['Seats not available']], 422);
        }

        return response()->json($trip);
    }
}
