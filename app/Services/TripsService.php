<?php

namespace App\Services;

use App\Exceptions\Trip\TripWrongStartTimeException;
use App\Exceptions\Trip\TripWrongEndTimeException;
use App\Exceptions\User\UserHasNotPermissionsToCreateTripsException;
use App\Exceptions\User\UserHasNotPermissionsToDeleteTripException;
use App\Exceptions\Vehicle\VehicleSeatsNotAvailableException;
use App\Models\{
    Trip, Vehicle, Route
};
use App\User;
use Carbon\Carbon;
use App\Repositories\TripRepository;
use App\Services\Requests\CreateTripRequest;
use App\Services\Requests\UpdateTripRequest;
use Illuminate\Support\Facades\Auth;

class TripsService
{
    private $tripRepository;

    public function __construct(TripRepository $tripRepository)
    {
        $this->tripRepository = $tripRepository;
    }

    /**
     * @param CreateTripRequest $request
     * @param $user
     * @return Trip
     * @throws TripWrongEndTimeException
     * @throws TripWrongStartTimeException
     * @throws UserHasNotPermissionsToCreateTripsException
     * @throws VehicleSeatsNotAvailableException
     */
    public function create(CreateTripRequest $request, $user): Trip
    {
        if (! $user->isDriver()) {
            throw new UserHasNotPermissionsToCreateTripsException('User has not permissions to create trip');
        }

        $tripAttributes = [
            'price' => $request->getPrice(),
            'seats' => $request->getSeats(),
            'start_at' => $request->getStartAt(),
            'end_at' => $request->getEndAt(),
            'vehicle_id' => $request->getVehicleId(),
            'user_id' => $user->id,
        ];

        $routeAttributes = [
            'from' => $request->getFrom(),
            'to' => $request->getTo(),
        ];

        $vehicle = Vehicle::find($request->getVehicleId());

        if ($vehicle->seats < $request->getSeats()) {
            throw new VehicleSeatsNotAvailableException('Count of seats is incorrect');
        }

        if ($request->getStartAt() > $request->getEndAt()) {
            throw new TripWrongEndTimeException('Incorrect end time');
        }

        if ($request->getStartAt() < Carbon::now()) {
            throw new TripWrongStartTimeException('Incorrect start time');
        }

        $trip = $this->tripRepository->save(new Trip($tripAttributes));
        $this->tripRepository->addRoute($trip, new Route($routeAttributes));

        return $trip;
    }

    /**
     * @param Trip $trip
     * @param UpdateTripRequest $request
     * @param $user
     * @return Trip
     */
    public function update(Trip $trip, UpdateTripRequest $request, $user): Trip
    {
        return $trip;
    }

    /**
     * @param Trip $trip
     * @param $user
     * @throws UserHasNotPermissionsToDeleteTripException
     */
    public function delete(Trip $trip, $user)
    {
        if (
            $trip->user_id != $user->id ||
            ! $user->isDriver()
        ) {
            throw new UserHasNotPermissionsToDeleteTripException('User has not permissions to delete this trip');
        }

        $this->tripRepository->delete($trip->id);
    }
}