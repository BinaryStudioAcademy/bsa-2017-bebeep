<?php

namespace App\Transformers\DetailTrip;

use App\Models\Vehicle;
use League\Fractal\TransformerAbstract;

class VehicleTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Vehicle $vehicle)
    {
        return [
            'id' => $vehicle['id'],
            'brand' => $vehicle['brand'],
            'color' => $vehicle['color'],
            'photo' => null,
        ];
    }
}
