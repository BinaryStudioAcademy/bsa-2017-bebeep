<?php

namespace App\Services\Result;

use App\User;
use App\Models\Trip;
use Illuminate\Database\Eloquent\Collection;

class SearchTrip
{
    protected $rawTrip;

    /** @var Trip $rawTrip */
    protected $modelTrip;

    public function __construct($rawTrip)
    {
        $this->rawTrip = $rawTrip;
    }

    public function setModel(Trip $trip)
    {
        $this->modelTrip = $trip;
    }

    public function driver() : User
    {
        return $this->modelTrip->user;
    }

    public function getFromPoint()
    {
        $route = $this->modelTrip->routes->where('id', '=', (int) $this->rawTrip->from_id)->first();

        return [
            'id' => $route->id,
            'location' => $route->from,
            'wanted' => true,
        ];
    }

    public function getToPoint()
    {
        $route = $this->modelTrip->routes->where('id', '=', (int) $this->rawTrip->to_id)->first();

        return [
            'id' => $route->id,
            'location' => $route->to,
            'wanted' => true,
        ];
    }

    public function routes() : array
    {
        /** @var Collection $routes */
        $routes = $this->modelTrip->routes;
        $first = $routes->first();
        $from = $this->getFromPoint();
        $to = $this->getToPoint();
        $last = $routes->last();
        $result = [];

        if ($first->id !== $from['id']) {
            $result[] = [
                'id' => $first->id,
                'location' => $first->from,
                'wanted' => false,
            ];
        }

        $result[] = $from;
        $result[] = $to;

        if ($last->id !== $to['id']) {
            $result[] = [
                'id' => $last->id,
                'location' => $last->to,
                'wanted' => false,
            ];
        }

        return $result;
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
