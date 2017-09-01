<?php

namespace App\Services\Result;

use App\Models\Trip;

class TripDetail
{
    /**
     * @var \App\Models\Trip
     */
    public $trip;

    /**
     * @var array
     */
    public $routes;

    /**
     * @param Trip $trip
     */
    public function __construct(Trip $trip)
    {
        $this->trip = $trip;
    }

    /**
     * Push the route in the trip routes collection.
     *
     * @param \App\Services\Result\RouteDetail $route
     *
     * @return $this
     */
    public function pushRoute(RouteDetail $route) : self
    {
        $this->routes[] = $route;

        return $this;
    }

    /**
     * @param string $name
     *
     * @return mixed
     */
    public function __get(string $name)
    {
        if ($name === 'routes') {
            return $this->routes;
        }

        if (isset($this->trip[$name])) {
            return $this->trip[$name];
        }

        return null;
    }
}
