<?php

namespace App\Services\Result;

use App\Models\Trip;
use App\User;

class SearchTrip
{
    protected $rawTrip;

    /** @var Trip $rawTrip */
    protected $modelTrip;

    public function __construct($rawTrip)
    {
        $this->trip = $rawTrip;
    }

    public function setModel(Trip $trip)
    {
        $this->modelTrip = $trip;
    }

    public function driver() : User
    {
        return $this->modelTrip->user;
    }

    public function routes() : array
    {
        $first = $this->modelTrip->routes->first();
        $last = $this->modelTrip->routes->last();
        $routes = [];

        if ($first->id !== $this->getFromRoute()['id']) {
            $routes[] = $first;
        }

        $routes[] = $this->getFromRoute();

        if ($last->id !== $this->getToRoute()['id']) {
            $routes[] = $last;
        }

        $routes[] = $this->getToRoute();

        return $routes;
    }

    public function getFromRoute() : array
    {
        return [
            'id' => $this->rawTrip->from_id,
            'location' => $this->rawTrip->from,
        ];
    }

    public function getToRoute() : array
    {
        return [
            'id' => $this->rawTrip->to_id,
            'location' => $this->rawTrip->to,
        ];
    }

    public function __get($name)
    {
        if ($name === 'routes') {
            return $this->routes();
        } elseif ($name === 'driver' || $name === 'user') {
            return $this->driver();
        } else {
            if (isset($this->modelTrip[$name])) {
                return $this->modelTrip[$name];
            }
        }
        return null;
    }
}