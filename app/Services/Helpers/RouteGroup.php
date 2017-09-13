<?php

namespace App\Services\Helpers;

use App\Models\Route;

class RouteGroup
{
    private $routes;

    public function __construct()
    {
        $this->routes = collect([]);
    }

    public function addRoute(Route $route)
    {
        $this->routes->push($route);
    }

    public function getRoutes()
    {
        return $this->routes;
    }
}
