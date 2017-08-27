<?php

namespace App\Transformers;

use App\Models\Vehicle;
use League\Fractal\TransformerAbstract;

class VehicleTransformer extends TransformerAbstract
{
    public function transform(Vehicle $vehicle): array
    {
        return $vehicle->toArray();
    }
}
