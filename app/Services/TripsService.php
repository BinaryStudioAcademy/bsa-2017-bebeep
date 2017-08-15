<?php

namespace App\Services;

use App\User;
use App\Models\Trip;
use App\Models\Route;
use App\Repositories\TripRepository;
use App\Exceptions\Trip\TripNotFoundException;
use App\Exceptions\Trip\UserCantEditTripException;
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
        $trip->routes()->create($routeAttributes);

        return $trip;
    }

    /**
     * Update trip service
     *
     * @param $tripId
     * @param UpdateTripRequest $request
     * @param $user
     * @return Trip
     * @throws TripNotFoundException
     * @throws UserCantEditTripException
     */
    public function update($tripId, UpdateTripRequest $request, $user)
    {
        $trip = $this->tripRepository->findTripById($tripId);

        if(is_null($trip)) {
            throw new TripNotFoundException("Trip not found");
        }

        if($user->id != $trip->user_id) {
            throw new UserCantEditTripException("User can't edit this trip");
        }

        $tripAttributes = [
            'price' => $request->getPrice(),
            'seats' => $request->getSeats(),
            'start_at' => $request->getStartAt(),
            'end_at' => $request->getEndAt(),
            'vehicle_id' => $request->getVehicleId(),
        ];

        $result = $this->tripRepository->updateTrip($trip, $tripAttributes);
        return $result;
    }

    /**
     * @param Trip $trip
     * @param $user
     * @throws UserHasNotPermissionsToDeleteTripException
     */
    public function delete(Trip $trip, $user)
    {
        if (
            $trip->user_id != $user->id
        ) {
            throw new UserHasNotPermissionsToDeleteTripException('User has not permissions to delete this trip');
        }

        $this->tripRepository->delete($trip->id);
    }
}
