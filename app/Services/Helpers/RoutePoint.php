<?php

namespace App\Services\Helpers;

use Illuminate\Support\Collection;
use RFHaversini\Distance;

class RoutePoint
{
    private $lat;
    private $lng;

    public function __construct($lat, $lng)
    {
        $this->lat = $lat;
        $this->lng = $lng;
    }

    /**
     * @param Collection $points
     * @return float|int
     */
    public function minDistanceToAny(Collection $points)
    {
        $result = 9999;

        foreach ($points as $point) {
            $distance = Distance::toKilometers(
                $this->getLat(),
                $this->getLng(),
                $point->getLat(),
                $point->getLng()
            );

            if ($distance >= $result) {
                continue;
            }

            $result = $distance;
        }

        return $result;
    }

    public function getLat()
    {
        return $this->lat;
    }

    public function getLng()
    {
        return $this->lng;
    }
}
