<?php

namespace App\Transformers;

use App\Models\Route;
use League\Fractal\TransformerAbstract;

class RouteTransformer extends TransformerAbstract
{
    public function transform(Route $route): array
    {
        return $route->toArray();
    }
}
