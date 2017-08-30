<?php

namespace App\Services\Contracts;

use App\Models\Route;

interface RouteService
{
    /**
     * Count reserved seats at route.
     *
     * @param Route $route
     * @return int
     */
    public function countReservedSeats(Route $route) : int;
}
