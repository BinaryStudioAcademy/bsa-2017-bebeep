<?php

namespace App\Services;

use App\User;
use App\Models\Trip;
use App\Models\Route;
use App\Repositories\TripRepository;
use Illuminate\Support\Facades\Validator;
use App\Services\Requests\CreateTripRequest;
use App\Services\Requests\UpdateTripRequest;
use App\Exceptions\User\UserHasNotPermissionsToDeleteTripException;

class TripsService
{
    /**
     * @var TripRepository
     */
    private $tripRepository;

    /**
     * TripsService constructor.
     * @param TripRepository $tripRepository
     */
    public function __construct(TripRepository $tripRepository)
    {
        $this->tripRepository = $tripRepository;
    }

    /**
     * @param CreateTripRequest $request
     * @param $user
     * @return Trip
     */
    public function create(CreateTripRequest $request, $user): Trip
    {
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
            ! Validator::make(['v' => true], ['v' => 'role:'.User::DRIVER_PERMISSION])->passes()
        ) {
            throw new UserHasNotPermissionsToDeleteTripException('User has not permissions to delete this trip');
        }

        $this->tripRepository->delete($trip->id);
    }
}
