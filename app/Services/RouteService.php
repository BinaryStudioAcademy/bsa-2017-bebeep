<?php

namespace App\Services;

use App\Models\Route;
use App\Models\Booking;

class RouteService implements Contracts\RouteService
{
    /**
     * {@inheritdoc}
     */
    public function countBusySeats(Route $route): int
    {
        return (int) $route->bookings->where('status', Booking::STATUS_APPROVED)->count();
    }
}