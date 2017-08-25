<?php

namespace App\Services\Result;

use App\Models\Route;

class RouteDetail
{
    /**
     * @var \App\Models\Route
     */
    protected $route;

    /**
     * @var int
     */
    protected $busySeats = 0;

    /**
     * @param \App\Models\Route $route
     */
    public function __construct(Route $route)
    {
        $this->route = $route;
    }

    /**
     * Set busy seats on the route.
     *
     * @param int $busySeats
     *
     * @return $this
     */
    public function setBusySeats(int $busySeats) : self
    {
        $this->busySeats = $busySeats;

        return $this;
    }

    /**
     * @param string $name
     *
     * @return mixed
     */
    public function __get(string $name)
    {
        if ($name === 'busySeats') {
            return $this->busySeats;
        }
        if (isset($this->route[$name])) {
            return $this->route[$name];
        }
        return null;
    }
}
