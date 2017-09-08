<?php

namespace App\Criteria\Subscriptions;

use Carbon\Carbon;
use App\Models\Trip;
use Illuminate\Database\Eloquent\Builder;
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
        /** @var Carbon $startAt */
        $startAt = $this->trip->start_at;
        /** @var Builder $model */
        $query = $model
            ->whereRaw('(SELECT '.
                $this->haversine(
                    'routes.from_lat',
                    'routes.from_lng',
                    'subscriptions.from_lat',
                    'subscriptions.from_lng'
                ).' '.
                'FROM routes '.
                'WHERE trip_id='.$this->trip->id.' AND trip_id IS NOT NULL) < '.self::DISTANCE_FROM
            )
            ->whereRaw('(SELECT '.
                $this->haversine(
                    'routes.to_lat',
                    'routes.to_lng',
                    'subscriptions.to_lat',
                    'subscriptions.to_lng'
                ).' '.
                'FROM routes '.
                'WHERE trip_id='.$this->trip->id.' AND trip_id IS NOT NULL) < '.self::DISTANCE_TO
            )
            ->where('subscriptions.start_at', '<=', $startAt)
            ->whereRaw('DATE_ADD(subscriptions.start_at, INTERVAL 1 DAY)>=\''.$startAt.'\'')
            ->where('subscriptions.is_active', true);

        return $query;
    }

    /**
     * Calculate the distance between two points.
     *
     * @param string $startLat
     * @param string $startLng
     * @param string $endLat
     * @param string $endLng
     * @return string
     */
    private function haversine(string $startLat, string $startLng, string $endLat, string $endLng): string
    {
        return 'ROUND(2 * '.self::EARTH_RADIUS_KM.' * ASIN(SQRT( '.
            "POWER(SIN(RADIANS({$startLat} - {$endLat}) / 2), 2) + ".
            "COS(RADIANS({$startLat})) * COS(RADIANS($endLat)) * ".
            "POWER(SIN(RADIANS({$startLng} - $endLng) / 2), 2) ".
            ')), 1)';
    }
}
