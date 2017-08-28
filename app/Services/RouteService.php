<?php

namespace App\Services;

use App\Models\{ Route, Booking };

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
