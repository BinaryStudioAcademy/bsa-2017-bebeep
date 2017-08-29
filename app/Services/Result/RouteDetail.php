<?php

namespace App\Services\Result;

use App\Models\Route;
use App\Models\Booking;
use Illuminate\Support\Collection;

class RouteDetail
{
    /**
     * @var \App\Models\Route
     */
    protected $route;

    /**
     * @var int
     */
    protected $reservedSeats = 0;

    /**
     * @param \App\Models\Route $route
     */
    public function __construct(Route $route)
    {
        $this->route = $route;
    }

    /**
     * Set reserved seats on the route.
     *
     * @param int $reservedSeats
     *
     * @return $this
     */
    public function setReservedSeats(int $reservedSeats) : self
    {
        $this->reservedSeats = $reservedSeats;

        return $this;
    }

    /**
     * Get approved bookings for the route.
     *
     * @return \Illuminate\Support\Collection|null
     */
    public function getApprovedBookings() : ?Collection
    {
        return $this->route->bookings()->where('status', Booking::STATUS_APPROVED)->get();
    }

    /**
     * @param string $name
     *
     * @return mixed
     */
    public function __get(string $name)
    {
        if ($name === 'reservedSeats') {
            return $this->reservedSeats;
        }

        if ($name === 'approvedBookings') {
            return $this->getApprovedBookings();
        }

        if (isset($this->route[$name])) {
            return $this->route[$name];
        }

        return null;
    }
}
