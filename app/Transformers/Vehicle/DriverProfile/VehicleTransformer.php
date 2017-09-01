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
     * @param \App\Vehicle $vehicle|null
     *
     * @return array
     */
    public function transform(?Vehicle $vehicle) : array
    {
        if ($vehicle === null) {
            return [];
        }

        return [
            'brand' => $vehicle->brand,
            'model' => $vehicle->model,
            'color' => $vehicle->color,
            'photo' => null,
        ];
    }
}
