<?php

namespace App\Services\Result;

use App\User;
use App\Models\Trip;
use Illuminate\Database\Eloquent\Collection;

class SearchTrip
{
    /**
     * @var mixed
     */
    protected $rawTrip;

    /**
     * @var \App\Models\Trip
     */
    protected $modelTrip;

    /**
     * @var float
     */
    protected $priceInCurrency;

    /**
     * @param mixed $rawTrip
     */
    public function __construct($rawTrip)
    {
        $this->rawTrip = $rawTrip;
    }

    /**
     * Set Trip model.
     *
     * @param \App\Models\Trip $trip
     *
     * @return $this
     */
    public function setModel(Trip $trip): self
    {
        $this->modelTrip = $trip;

        return $this;
    }

    /**
     * Set the trip price in currency.
     *
     * @param float $priceInCurrency
     *
     * @return $this
     */
    public function setPriceInCurrency(float $priceInCurrency): self
    {
        $this->priceInCurrency = $priceInCurrency;

        return $this;
    }

    /**
     * Get the trip driver.
     *
     * @return \App\User
     */
    public function driver(): User
    {
        return $this->modelTrip->user;
    }

    /**
     * Get the trip from_point data.
     *
     * @return array
     */
    public function getFromPoint(): array
    {
        $route = $this->modelTrip
            ->routes
            ->where('id', '=', (int) $this->rawTrip->from_id)
            ->first();

        return [
            'id' => $route->id,
            'location' => $route->from,
            'wanted' => true,
        ];
    }

    /**
     * Get the trip to_point data.
     *
     * @return array
     */
    public function getToPoint(): array
    {
        $route = $this->modelTrip
            ->routes
            ->where('id', '=', (int) $this->rawTrip->to_id)
            ->first();

        return [
            'id' => $route->id,
            'location' => $route->to,
            'wanted' => true,
        ];
    }

    /**
     * Get the trip routes.
     *
     * @return array
     */
    public function routes(): array
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

    /**
     * Get the trip available seats.
     *
     * @return int
     */
    public function getAvailableSeats(): int
    {
        /** @var \Illuminate\Support\Collection $routes */
        $routes = $this->modelTrip->routes->sortBy('id');
        $fromOffset = 0;
        $toOffset = 0;
        $offset = 0;

        foreach ($routes as $route) {
            if ($route->id == $this->rawTrip->from_id) {
                $fromOffset = $offset;
            }
            if ($route->id == $this->rawTrip->to_id) {
                $toOffset = $offset;
                break;
            }
            $offset++;
        }

        $seats = $routes->slice($fromOffset, $toOffset + 1)
            ->max(function ($route) {
                return $route->available_seats;
            });

        return $seats;
    }

    /**
     * @param string $name
     *
     * @return mixed
     */
    public function __get(string $name)
    {
        if ($name === 'available_seats') {
            return $this->getAvailableSeats();
        }
        if ($name === 'routes') {
            return $this->routes();
        }
        if ($name === 'driver' || $name === 'user') {
            return $this->driver();
        }
        if ($name === 'priceInCurrency') {
            return $this->priceInCurrency;
        }
        if (isset($this->modelTrip[$name])) {
            return $this->modelTrip[$name];
        }

        return null;
    }
}
