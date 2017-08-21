<?php

namespace App\Services\Result;

use App\Models\Trip;

class TripDetail
{
    public $trip;
    public $routes;

    public function __construct(Trip $trip)
    {
        $this->trip = $trip;
    }

    public function pushRoute(RouteDetail $route)
    {
        return $this->routes[] = $route;
    }

    public function __get($name)
    {
        if ($name === 'routes') {
            return $this->routes;
        } elseif (isset($this->trip, $name)) {
            return $this->trip[$name];
        }

        return null;
    }
}
