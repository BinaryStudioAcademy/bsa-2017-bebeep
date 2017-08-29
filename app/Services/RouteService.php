<?php

namespace App\Services;

use App\Models\Route;

class RouteService implements Contracts\RouteService
{
    /**
     * {@inheritdoc}
     */
    public function countReservedSeats(Route $route) : int
    {
        return $route->reserved_seats;
    }
}
