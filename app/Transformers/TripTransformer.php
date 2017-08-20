<?php

namespace App\Transformers;

use App\Models\Trip;
use League\Fractal\TransformerAbstract;

class TripTransformer extends TransformerAbstract
{
    protected $availableIncludes = [
        'routes',
        'vehicle',
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
}
