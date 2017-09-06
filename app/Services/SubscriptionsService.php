<?php

namespace App\Services;

use App\Models\Trip;
use App\Models\Subscription;
use App\Services\Helpers\Subscriptions\FilterCollection;
use Illuminate\Support\Collection;
use App\Repositories\Contracts\SubscriptionRepository;
use App\Criteria\Subscriptions\SubscriptionTripCriteria;

class SubscriptionsService implements Contracts\SubscriptionsService
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
        $collection = collect($this->subscriptionRepository->getByCriteria(new SubscriptionTripCriteria($trip)));

        $filterCollection = new FilterCollection(
            // ... set your filters here
        );

        $subscriptions = $collection->filter(function (Subscription $subscription) use ($trip, $filterCollection) {
            return $filterCollection->isSatisfied($subscription, $trip);
        });

        return $subscriptions;
    }
}
