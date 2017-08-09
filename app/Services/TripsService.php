<?php

namespace App\Services;

use App\Exceptions\Trip\TripWrongStartTimeException;
use App\Exceptions\Trip\TripWrongEndTimeException;
use App\Exceptions\Vehicle\VehicleSeatsNotAvailableException;
use App\Models\{Trip, Vehicle, Route};
use Carbon\Carbon;
use App\Repositories\TripRepository;
use App\Services\Requests\CreateTripRequest;
use App\Services\Requests\UpdateTripRequest;

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
     * @throws TripWrongStartTimeException
     * @throws TripWrongEndTimeException
     * @throws VehicleSeatsNotAvailableException
     */
    public function create(CreateTripRequest $request) : Trip
    {
        $tripAttributes = [
            'price' => $request->getPrice(),
            'seats' => $request->getSeats(),
            'start_at' => $request->getStartAt(),
            'end_at' => $request->getEndAt(),
            'vehicle_id' => $request->getVehicleId(),
            // 'user_id' => Auth::user()->id,
        ];

        $routeAttributes = [
            'from' => $request->getFrom(),
            'to' => $request->getTo()
        ];

        $vehicle = Vehicle::find($request->getVehicleId());

        if ($vehicle->seats < $request->getSeats()) {
            throw new VehicleSeatsNotAvailableException();
        }

        if ($request->getStartAt() > $request->getEndAt()) {
            throw new TripWrongEndTimeException();
        }

        if ($request->getStartAt() < Carbon::now()) {
            throw new TripWrongStartTimeException();
        }

        $trip = $this->tripRepository->save(new Trip($tripAttributes));
        $this->tripRepository->addRoute($trip, new Route($routeAttributes));

        return $trip;
    }

    public function update(UpdateTripRequest $request) : Trip
    {
        $tripAttributes = [
            //'user_id' => Auth::user()->id,
            'price' => $request->getPrice(),
            'seats' => $request->getSeats(),
            'start_at' => $request->getStartAt(),
            'end_at' => $request->getEndAt(),
            'vehicle_id' => $request->getVehicleId(),
        ];

        $routeAttributes = [
            'from' => $request->getFrom(),
            'to' => $request->getTo()
        ];

    }
}