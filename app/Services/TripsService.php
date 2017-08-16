<?php

namespace App\Services;

use App\Criteria\Trips\AllDriverTripsCriteria;
use App\Criteria\Trips\PastDriverTripsCriteria;
use App\Criteria\Trips\UpcomingDriverTripsCriteria;
use App\Models\Trip;
use App\Repositories\TripRepository;
use App\Rules\DeleteTrip\TripOwnerRule;
use App\Exceptions\Trip\TripNotFoundException;
use App\Exceptions\Trip\UserCantEditTripException;
use Illuminate\Support\Facades\Validator;
use App\Services\Requests\CreateTripRequest;
use App\Services\Requests\UpdateTripRequest;
use App\User;
use App\Validators\DeleteTripValidator;
use App\Validators\RestoreTripValidator;
use Prettus\Repository\Contracts\CriteriaInterface;

class TripsService
{
    private $tripRepository;
    private $deleteTripValidator;
    private $restoreTripValidator;

    /**
     * TripsService constructor.
     * @param TripRepository $tripRepository
     * @param DeleteTripValidator $deleteTripValidator
     * @param RestoreTripValidator $restoreTripValidator
     */
    public function __construct(TripRepository $tripRepository, DeleteTripValidator $deleteTripValidator, RestoreTripValidator $restoreTripValidator)
    {
        $this->tripRepository = $tripRepository;
        $this->deleteTripValidator = $deleteTripValidator;
        $this->restoreTripValidator = $restoreTripValidator;
    }

    /**
     * @param User $user
     * @return mixed
     */
    public function getAll(User $user)
    {
        return $this->tripRepository->getByCriteria(new AllDriverTripsCriteria($user));
    }

    /**
     * @param User $user
     * @return mixed
     */
    public function getUpcoming(User $user)
    {
        return $this->tripRepository->getByCriteria(new UpcomingDriverTripsCriteria($user));
    }

    /**
     * @param User $user
     * @return mixed
     */
    public function getPast(User $user)
    {
        return $this->tripRepository->getByCriteria(new PastDriverTripsCriteria($user));
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

        $routeAttributes = [
            'from' => $request->getFrom(),
            'to' => $request->getTo(),
        ];

        $result = $this->tripRepository->updateTrip($trip, $tripAttributes);
        $result->routes()->fill($routeAttributes)->save();

        return $result;
    }

    /**
     * @param Trip $trip
     * @param $user
     * @return Trip
     */
    public function delete(Trip $trip, $user)
    {
        $this->deleteTripValidator->validate($trip, $user);
        $this->tripRepository->softDelete($trip);

        return $trip;
    }

    /**
     * @param Trip $trip
     * @param $user
     * @return Trip
     */
    public function restore(Trip $trip, $user)
    {
        $this->restoreTripValidator->validate($trip, $user);
        $this->tripRepository->restore($trip);

        return $trip;
    }
}
