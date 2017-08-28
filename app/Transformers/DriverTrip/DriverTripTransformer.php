<?php

namespace App\Transformers\DriverTrip;

use App\Models\Trip;
use League\Fractal\TransformerAbstract;

class DriverTripTransformer extends TransformerAbstract
{
    protected $availableIncludes = [
        'routes',
        'vehicle',
        'bookings',
    ];

    public function transform(Trip $trip): array
    {
        return $trip->toArray();
    }

    public function includeRoutes(Trip $trip)
    {
        return $this->collection($trip->routes, new RouteTransformer());
    }

    public function includeVehicle(Trip $trip)
    {
        return $this->item($trip->vehicle, new VehicleTransformer());
    }

    public function includeBookings(Trip $trip)
    {
        return $this->collection($trip->bookings, new BookingTransformer());
    }
}
