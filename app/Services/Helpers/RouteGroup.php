<?php

namespace App\Services\Helpers;

use App\Models\Route;

class RouteGroup
{
    private $routes = [];

    public function addRoute(Route $route)
    {
        array_push($this->routes, $route->toArray());
    }

    public function getRoutes()
    {
        return $this->routes;
    }
}
