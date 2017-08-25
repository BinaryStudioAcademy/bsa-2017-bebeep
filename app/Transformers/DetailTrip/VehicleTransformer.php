<?php

namespace App\Transformers\DetailTrip;

use App\Models\Vehicle;
use League\Fractal\TransformerAbstract;

class VehicleTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @param \App\Models\Vehicle $vehicle
     * @return array
     */
    public function transform(Vehicle $vehicle) : array
    {
        return [
            'id' => $vehicle->id,
            'brand' => $vehicle->brand,
            'color' => $vehicle->color,
            'photo' => null,
        ];
    }
}
