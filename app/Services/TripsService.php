<?php

namespace App\Services;

use App\Exceptions\Vehicle\VehicleSeatsNotAvailableException;
use App\Models\Route;
use App\Models\Trip;
use App\Models\Vehicle;
use App\Repositories\TripRepository;
use App\Services\Requests\CreateTripRequest;

class TripsService
{
    private $tripRepository;

    public function __construct(TripRepository $tripRepository)
    {
        $this->tripRepository = $tripRepository;
    }

    /**
     * @param CreateTripRequest $request
     * @return Trip
     */
    public function create(CreateTripRequest $request) : Trip
    {
        $attributes = [
            'price' => $request->getPrice(),
            'seats' => $request->getSeats(),
            'start_at' => $request->getStartAt(),
            'end_at' => $request->getEndAt(),
            'vehicle_id' => $request->getVehicleId(),
            // 'user_id' => Auth::user()->id,
        ];

        $routeAttributes = [
            'from' => $request->getFrom(),
            'to' => $request->getTo(),
        ];

        $vehicle = Vehicle::find($request->getVehicleId());

        if ($vehicle->seats < $request->getSeats()) {
            throw new VehicleSeatsNotAvailableException();
        }

        $trip = $this->tripRepository->save(new Trip($attributes));
        $this->tripRepository->addRoute($trip, new Route($routeAttributes));

        return $trip;
    }
}