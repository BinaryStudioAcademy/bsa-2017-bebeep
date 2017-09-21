<?php

namespace App\Services\Helpers;

class RoutePriceHelper
{
    /**
     * @var array
     */
    private $routeTimes = [];

    /**
     * @var float
     */
    private $totalPrice;

    /**
     * @var int
     */
    private $totalDuration;

    public function __construct(float $totalPrice, array $routeTimes)
    {
        $this->routeTimes = $routeTimes;
        $this->totalPrice = $totalPrice;

        $this->totalDuration = $this->getDuration($routeTimes);
    }

    public function getPriceByKey($key) : float
    {
        if (isset($this->routeTimes[$key])) {
            return $this->getPrice(
                $this->totalPrice,
                $this->getRouteDuration($this->routeTimes[$key]),
                $this->totalDuration
            );
        } else {
            return 0.0;
        }
    }

    private function getPrice(float $totalPrice, int $routeDuration, int $totalDuration) : float
    {
        return $totalPrice * $routeDuration / $totalDuration;
    }

    private function getRouteDuration(array $time) : int
    {
        return $time['end_at'] - $time['start_at'];
    }

    private function getDuration(array $routeTimes) : int
    {
        return array_reduce($routeTimes, function ($duration, $time) {
            return $duration + $this->getRouteDuration($time);
        }, 0);
    }
}
