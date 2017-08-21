<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Route;

class RouteService implements Contracts\RouteService
{
    public function countBusySeats(Route $route): int
    {
        return (int) $route->bookings->where('status', Booking::STATUS_APPROVED)->count();
    }

}