<?php

namespace App\Http\Controllers;

use App\Services\SearchTripsWithTransfersService;
use App\User;
use App\Models\Trip;
use App\Services\TripsService;
use App\Services\TripDetailService;
use Illuminate\Support\Facades\Auth;
use App\Transformers\TripTransformer;
use App\Http\Requests\CreateTripRequest;
use App\Http\Requests\SearchTripRequest;
use App\Http\Requests\UpdateTripRequest;
use App\Http\Requests\GetDriverTripRequest;
use App\Exceptions\Trip\UserCantEditTripException;
use App\Transformers\Search\SearchTripTransformer;
use App\Transformers\DriverTrip\DriverTripTransformer;
use App\Exceptions\User\UserHasNotPermissionsToDeleteTripException;
use App\Transformers\DetailTrip\TripTransformer as TripDetailsTransformer;

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
     * @var SearchTripsWithTransfersService
     */
    private $searchTripsWithTransfersService;

    /**
     * TripsController constructor.
     *
     * @param TripsService $tripsService
     * @param TripDetailService $tripDetailService
     * @param SearchTripsWithTransfersService $searchTripsWithTransfersService
     */
    public function __construct(TripsService $tripsService, TripDetailService $tripDetailService, SearchTripsWithTransfersService $searchTripsWithTransfersService)
    {
        $this->tripsService = $tripsService;
        $this->tripDetailService = $tripDetailService;
        $this->searchTripsWithTransfersService = $searchTripsWithTransfersService;
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

        return fractal()->collection($trips, new DriverTripTransformer())
            ->parseIncludes(['routes', 'vehicle', 'bookings', 'bookings.user'])
            ->respond();
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPast()
    {
        $trips = $this->tripsService->getPast(Auth::user());

        return fractal()->collection($trips, new DriverTripTransformer())
            ->parseIncludes(['routes', 'vehicle', 'bookings', 'bookings.user'])
            ->respond();
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
            $trip = $this->tripsService->update($trip, $request, Auth::user());

            return response()->json($trip, 200);
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
     * @return array|\Illuminate\Http\JsonResponse
     */
    public function search(SearchTripRequest $request)
    {
        if ($request->getTransfers() >= 1) {
            return $this->searchTripsWithTransfersService->search($request);
        }

        $trips = $this->tripsService->search($request);

        return fractal()
            ->collection($trips, new SearchTripTransformer())
            ->parseIncludes(['driver', 'routes'])
            ->addMeta($trips->getMeta())
            ->respond();
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
            ->item($tripDetail, new TripDetailsTransformer())
            ->parseIncludes([
                'driver',
                'vehicle',
                'routes',
                'routes.bookings',
                'routes.bookings.user',
            ])
            ->addMeta([
                'is_owner' => $this->tripDetailService->isOwner($trip, Auth::user() ?? new User()),
                'has_booking' => $this->tripDetailService->hasBookings($trip, Auth::user() ?? new User()),
            ])
            ->respond();
    }
}
