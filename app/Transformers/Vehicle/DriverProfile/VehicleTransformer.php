<?php

namespace App\Transformers\Vehicle\DriverProfile;

use App\Models\Vehicle;
use League\Fractal\TransformerAbstract;

/**
 * Class DriverPublicProfileTransformer.
 */
class VehicleTransformer extends TransformerAbstract
{
    /**
     * Transform the driver vehicle data.
     *
     * @param \App\Vehicle $vehicle
     *
     * @return array
     */
    public function transform(Vehicle $vehicle) : array
    {
        return [
            'brand' => $vehicle->brand,
            'model' => $vehicle->model,
            'color' => $vehicle->color,
            'photo' => null,
        ];
    }
}
