<?php

namespace App\Transformers\DetailTrip;

use App\Models\Trip;
use App\Services\Result\TripDetail;
use League\Fractal\TransformerAbstract;

class TripTransformer extends TransformerAbstract
{
    /**
     * @var array
     */
    protected $availableIncludes = [
        'routes',
        'driver',
        'vehicle',
    ];

    /**
     * A Fractal transformer.
     *
     * @param \App\Services\Result\TripDetail $trip
     * @return array
     */
    public function transform(TripDetail $trip) : array
    {
        return [
            'trip' => [
                'id' => $trip->id,
                'price' => $trip->price,
                'currency_id' => $trip->currency_id,
                'seats' => $trip->seats,
                'start_at' => (string) $trip->start_at,
                'start_at_x' => $trip->start_at->timestamp,
            ],
        ];
    }

    /**
     * @param \App\Services\Result\TripDetail $trip
     * @return \League\Fractal\Resource\Collection
     */
    public function includeRoutes(TripDetail $trip)
    {
        return $this->collection($trip->routes, new RouteTransformer());
    }

    /**
     * @param \App\Services\Result\TripDetail $trip
     * @return \League\Fractal\Resource\Item
     */
    public function includeDriver(TripDetail $trip)
    {
        return $this->item($trip->user, new UserDriverTransformer());
    }

    /**
     * @param \App\Services\Result\TripDetail $trip
     * @return \League\Fractal\Resource\Item
     */
    public function includeVehicle(TripDetail $trip)
    {
        return $this->item($trip->vehicle, new VehicleTransformer());
    }
}
