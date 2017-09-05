<?php

namespace App\Criteria\Subscriptions;

use App\Models\Trip;
use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

class SubscriptionTripCriteria implements CriteriaInterface
{
    const DISTANCE_TO = 20;
    const DISTANCE_FROM = 20;
    const EARTH_RADIUS_KM = 6371;

    /**
     * @var Trip
     */
    private $trip;

    public function __construct(Trip $trip)
    {
        $this->trip = $trip;
    }

    /**
     * {@inheritdoc}
     */
    public function apply($model, RepositoryInterface $repository)
    {
        return $model;
    }

    /**
     * Calculate the distance between two points.
     *
     * @param string $startLat
     * @param string $startLng
     * @param float $endLat
     * @param float $endLng
     * @return string
     */
    private function haversine(string $startLat, string $startLng, float $endLat, float $endLng): string
    {
        return 'ROUND(2 * ' . self::EARTH_RADIUS_KM . ' * ASIN(SQRT( '.
            'POWER(SIN(RADIANS({$startLat} - {$endLat}) / 2), 2) + '.
            'COS(RADIANS({$startLat})) * COS(RADIANS($endLat)) * '.
            'POWER(SIN(RADIANS({$startLng} - $endLng) / 2), 2) '.
            ')), 1)';
    }
}
