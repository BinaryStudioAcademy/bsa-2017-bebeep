<?php

namespace App\Http\Controllers;

use App\Exceptions\Trip\TripWrongEndTimeException;
use App\Exceptions\Trip\TripWrongStartTimeException;
use App\Exceptions\User\UserHasNotPermissionsToCreateTripsException;
use App\Exceptions\User\UserHasNotPermissionsToDeleteTripException;
use App\Exceptions\Vehicle\VehicleSeatsNotAvailableException;
use App\Http\Requests\CreateTripRequest;
use App\Models\Trip;
use App\Services\TripsService;
use Illuminate\Support\Facades\Auth;

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
            $trip = $this->tripsService->create($request, Auth::user());
        } catch (VehicleSeatsNotAvailableException $e) {
            return response()->json(['seats' => [$e->getMessage()]], 422);
        } catch (TripWrongStartTimeException $e) {
            return response()->json(['start_at' => [$e->getMessage()]], 422);
        } catch (TripWrongEndTimeException $e) {
            return response()->json(['end_at' => [$e->getMessage()]], 422);
        } catch (UserHasNotPermissionsToCreateTripsException $e) {
            return response()->json(['end_at' => [$e->getMessage()]], 422);
        }

        return response()->json($trip);
    }

    public function update(int $id)
    {

    }

    /**
     * @param Trip $trip
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete(Trip $trip)
    {
        try {
            $this->tripsService->delete($trip, Auth::user());
        } catch (UserHasNotPermissionsToDeleteTripException $e) {
            return response()->json(['errors' => [$e->getMessage()]], 422);
        }

        return response()->json(['success' => true]);
    }
}
