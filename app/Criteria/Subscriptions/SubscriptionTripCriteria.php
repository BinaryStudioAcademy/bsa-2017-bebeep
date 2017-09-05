<?php

namespace App\Criteria\Subscriptions;

use App\Models\Trip;
use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

class SubscriptionTripCriteria implements CriteriaInterface
{
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
}
