<?php

namespace App\Services\Helpers;

use App\Models\Route;

class RouteContainer
{
    private $route;

    public function __construct(Route $route)
    {
        $this->route = $route;
    }

    public function startPoint()
    {
        return new RoutePoint($this->route->from_lat, $this->route->from_lng);
    }

    public function endPoint()
    {
        return new RoutePoint($this->route->to_lat, $this->route->to_lng);
    }

    public function getRoute(): Route
    {
        return $this->route;
    }
}
