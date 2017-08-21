<?php

namespace App\Http\Controllers;

use App\Models\Trip;
use App\Services\{
    TripsService,
    TripDetailService
};
use App\Transformers\{
    DetailTrip,
    TripTransformer,
    SearchRideTransformer
};
use App\Http\Requests\{
    CreateTripRequest,
    UpdateTripRequest,
    SearchTripRequest,
    GetDriverTripRequest
};
use App\Exceptions\{
    Trip\UserCantEditTripException,
    User\UserHasNotPermissionsToDeleteTripException
};
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class TripsController extends Controller
{
    /**
     * @var TripsService
     */
    private $tripsService;

    /**
     * @var TripDetailService
     */
    private $tripDetailService;

    /**
     * TripsController constructor.
     *
     * @param TripsService $tripsService
     * @param TripDetailService $tripDetailService
     */
    public function __construct(TripsService $tripsService, TripDetailService $tripDetailService)
    {
        $this->tripsService = $tripsService;
        $this->tripDetailService = $tripDetailService;
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
     *
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
     * @param GetDriverTripRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Trip $trip, GetDriverTripRequest $request)
    {
        return fractal()->item($trip, new TripTransformer())
            ->parseIncludes(['vehicle', 'routes'])
            ->respond();
    }

    /**
     * Update trip.
     *
     * @param $trip
     * @param UpdateTripRequest $request
     *
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
     *
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

    /**
     * @param SearchTripRequest $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function search(SearchTripRequest $request)
    {
        $trips = $this->tripsService->search($request);

        return fractal(Collection::make($trips), new SearchRideTransformer())->respond();
    }

    /**
     * @param $tripId
     *
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

    /**
     * @param Trip $trip
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function detail(Trip $trip)
    {
        $tripDetail = $this->tripDetailService->getDetail($trip);
        return fractal()
            ->item($tripDetail, new DetailTrip\TripTransformer())
            ->parseIncludes(['driver', 'routes', 'vehicle'])
            ->respond();
    }
}
