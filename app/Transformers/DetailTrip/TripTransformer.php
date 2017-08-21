<?php

namespace App\Transformers\DetailTrip;

use App\Models\Trip;
use App\Services\Result\TripDetail;
use League\Fractal\TransformerAbstract;

class TripTransformer extends TransformerAbstract
{
    protected $availableIncludes = [
        'driver',
        'routes',
        'vehicle',
    ];

    /**
     * A Fractal transformer.
     *
     * @param Trip $trip
     * @return array
     */
    public function transform(TripDetail $trip): array
    {
        return [
            'trip' => [
                'id' => $trip->id,
                'price' => $trip->price,
                'seats' => $trip->seats,
                'start_at' => (string) $trip->start_at,
                'start_at_x' => $trip->start_at->timestamp,
            ],
        ];
    }

    public function includeRoutes(TripDetail $trip)
    {
        return $this->collection($trip->routes, new RouteTransformer());
    }

    public function includeDriver(TripDetail $trip)
    {
        return $this->item($trip->user, new UserTransformer());
    }

    public function includeVehicle(TripDetail $trip)
    {
        return $this->item($trip->vehicle, new VehicleTransformer());
    }
}
