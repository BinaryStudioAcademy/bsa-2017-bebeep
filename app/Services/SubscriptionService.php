<?php

namespace App\Services;

use App\Models\Trip;
use Illuminate\Support\Collection;
use App\Repositories\Contracts\SubscriptionRepository;
use App\Criteria\Subscriptions\SubscriptionTripCriteria;

class SubscriptionService implements Contracts\SubscriptionService
{
    /**
     * @var SubscriptionRepository
     */
    private $subscriptionRepository;

    public function __construct(SubscriptionRepository $subscriptionRepository)
    {
        $this->subscriptionRepository = $subscriptionRepository;
    }

    /**
     * {@inheritdoc}
     */
    public function getSubscriptionsByTrip(Trip $trip): Collection
    {
        $subscriptions = $this->subscriptionRepository->getByCriteria(new SubscriptionTripCriteria($trip));

        return collect($subscriptions);
    }
}
