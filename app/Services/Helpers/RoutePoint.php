<?php

namespace App\Services\Helpers;

use RFHaversini\Distance;
use Illuminate\Support\Collection;

class RoutePoint
{
    private $lat;
    private $lng;
    private $startAt;
    private $endAt;

    public function __construct($lat, $lng, $startAt, $endAt)
    {
        $this->lat = $lat;
        $this->lng = $lng;
        $this->startAt = $startAt;
        $this->endAt = $endAt;
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

    public function getStartAt()
    {
        return $this->startAt;
    }

    public function getEndAt()
    {
        return $this->endAt;
    }
}
