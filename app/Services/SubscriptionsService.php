<?php

namespace App\Services;

use App\Models\Trip;
use App\Models\Subscription;
use Illuminate\Support\Collection;
use App\Repositories\Contracts\SubscriptionRepository;
use App\Criteria\Subscriptions\SubscriptionTripCriteria;
use App\Services\Helpers\Subscriptions\FilterCollection;

class SubscriptionsService implements Contracts\SubscriptionsService
{
    /**
     * @var SubscriptionRepository
     */
    private $subscriptionRepository;
    /**
     * @var FilterCollection
     */
    private $filterCollection;

    public function __construct(SubscriptionRepository $subscriptionRepository, FilterCollection $filterCollection)
    {
        $this->subscriptionRepository = $subscriptionRepository;
        $this->filterCollection = $filterCollection;
    }

    /**
     * {@inheritdoc}
     */
    public function getSubscriptionsByTrip(Trip $trip): Collection
    {
        $collection = collect($this->subscriptionRepository->getByCriteria(new SubscriptionTripCriteria($trip)));

        $subscriptions = $collection->filter(function (Subscription $subscription) use ($trip) {
            return $this->filterCollection->isSatisfied($subscription, $trip);
        });

        return $subscriptions;
    }
}
