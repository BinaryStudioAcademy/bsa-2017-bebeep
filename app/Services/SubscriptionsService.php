<?php

namespace App\Services;

use App\Models\Trip;
use App\Models\Subscription;
use Illuminate\Support\Collection;
use App\Repositories\Contracts\SubscriptionRepository;
use App\Criteria\Subscriptions\SubscriptionTripCriteria;
use App\Services\Helpers\Subscriptions\FilterCollection;
use App\Services\Helpers\Subscriptions\Filters\EndTimeFilter;
use App\Services\Helpers\Subscriptions\Filters\StartTimeFilter;

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
            new StartTimeFilter(),
            new EndTimeFilter()
        );

        $subscriptions = $collection->filter(function (Subscription $subscription) use ($trip, $filterCollection) {
            return $filterCollection->isSatisfied($subscription, $trip);
        });

        return $subscriptions;
    }
}
