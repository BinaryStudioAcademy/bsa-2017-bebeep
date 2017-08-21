<?php

namespace App\Services\Result;

use App\Models\Route;

class RouteDetail
{
    protected $route;
    protected $busySeats;

    public function __construct(Route $route)
    {
        $this->route = $route;
        $this->busySeats = 0;
    }

    public function setBusySeats(int $busySeats) : RouteDetail
    {
        $this->busySeats = $busySeats;

        return $this;
    }

    public function __get($name)
    {
        if ($name === 'busySeats') {
            return $this->busySeats;
        } elseif (isset($this->route[$name])) {
            return $this->route[$name];
        }

        return null;
    }
}
