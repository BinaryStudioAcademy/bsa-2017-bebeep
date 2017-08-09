<?php

namespace App\Http\Controllers;

use App\Exceptions\Trip\TripWrongEndTimeException;
use App\Exceptions\Trip\TripWrongStartTimeException;
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
            return response()->json(['seats' => ['Count of seats is incorrect']], 422);
        } catch (TripWrongStartTimeException $s) {
            return response()->json(['start_at' => ['Incorrect start time']], 422);
        } catch (TripWrongEndTimeException $t) {
            return response()->json(['end_at' => ['Incorrect end time']], 422);
        }

        return response()->json($trip);
    }

    public function update(int $id)
    {

    }
}
