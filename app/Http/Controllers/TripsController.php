<?php

namespace App\Http\Controllers;

use App\Models\Trip;
use App\Services\TripsService;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CreateTripRequest;
use App\Http\Requests\SearchTripRequest;
use App\Http\Requests\UpdateTripRequest;
use App\Exceptions\Trip\UserCantEditTripException;
use App\Exceptions\User\UserHasNotPermissionsToDeleteTripException;

class TripsController extends Controller
{
    /**
     * @var TripsService
     */
    private $tripsService;

    /**
     * TripsController constructor.
     * @param TripsService $tripsService
     */
    public function __construct(TripsService $tripsService)
    {
        $this->tripsService = $tripsService;
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAll()
    {
        $trips = $this->tripsService->getAll(Auth::user());

        return response()->json($trips);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUpcoming()
    {
        $trips = $this->tripsService->getUpcoming(Auth::user());

        return response()->json($trips);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPast()
    {
        $trips = $this->tripsService->getPast(Auth::user());

        return response()->json($trips);
    }

    /**
     * @param CreateTripRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(CreateTripRequest $request)
    {
        $trip = $this->tripsService->create($request, Auth::user());

        return response()->json($trip);
    }

    /**
     * Show trip.
     *
     * @param Trip $trip
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Trip $trip)
    {
        $result = $this->tripsService->show($trip, Auth::user());

        return response()->json($result, 200);
    }

    /**
     * Update trip.
     *
     * @param $trip
     * @param UpdateTripRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Trip $trip, UpdateTripRequest $request)
    {
        try {
            $result = $this->tripsService->update($trip, $request, Auth::user());

            return response()->json($result, 200);
        } catch (UserCantEditTripException $e) {
            return response()->json(['error' => $e->getMessage()], 401);
        }
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

        return response()->json($trip);
    }

    public function search(SearchTripRequest $request)
    {
        $data = $this->tripsService->search($request);

        return response()->json($data);
    }

    /**
     * @param $tripId
     * @return \Illuminate\Http\JsonResponse
     */
    public function restore($tripId)
    {
        $trip = Trip::withTrashed()->where('id', $tripId)->firstOrFail();

        try {
            $this->tripsService->restore($trip, Auth::user());
        } catch (\Exception $e) {
            return response()->json(['errors' => [$e->getMessage()]], 422);
        }

        return response()->json($trip);
    }
}
