<?php

namespace App\Services\Contracts;

use App\Models\Route;

interface RouteService
{
    /**
     * Count busy seats at route
     *
     * @param Route $route
     * @return int
     */
    public function countBusySeats(Route $route) : int;
}