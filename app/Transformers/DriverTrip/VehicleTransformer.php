<?php

namespace App\Transformers\DriverTrip;

use App\Models\Vehicle;
use League\Fractal\TransformerAbstract;

class VehicleTransformer extends TransformerAbstract
{
    public function transform(Vehicle $vehicle): array
    {
        return $vehicle->toArray();
    }
}
