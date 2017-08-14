<?php

namespace App\Services;

use App\Models\Trip;
use App\Repositories\TripRepository;
use App\Rules\DeleteTrip\TripOwnerRule;
use App\Services\Requests\CreateTripRequest;
use App\Services\Requests\UpdateTripRequest;

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
     * @return Trip
     */
    public function delete(Trip $trip, $user)
    {
        $rules = [TripOwnerRule::class];

        foreach ($rules as $rule) {
            (new $rule)->validate($trip, $user);
        }

        $this->tripRepository->softDelete($trip);

        return $trip;
    }
}
