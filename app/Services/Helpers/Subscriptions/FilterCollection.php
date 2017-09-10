<?php

namespace App\Services\Helpers\Subscriptions;

use App\Models\Trip;
use App\Models\Filter;
use App\Models\Subscription;
use Illuminate\Support\Collection;
use App\Services\Helpers\Subscriptions\Filters\Contracts\SubscriptionFilter;

class FilterCollection
{
    /**
     * @var Collection
     */
    private $filters;

    public function __construct(SubscriptionFilter ...$filters)
    {
        $this->filters = collect($filters);
    }

    /**
     * @param Subscription $subscription
     * @param Trip $trip
     * @return bool
     */
    public function isSatisfied(Subscription $subscription, Trip $trip) : bool
    {
        return $subscription->filters->reduce(function (bool $result, Filter $filter) use ($trip) {
            return $result && $this->filters->filter(function (SubscriptionFilter $subscriptionFilter) use ($filter) {
                return $subscriptionFilter->support($filter);
            })->reduce(function (bool $result, SubscriptionFilter $subscriptionFilter) use ($filter, $trip) {
                return $result && $subscriptionFilter->isSatisfied($filter, $trip);
            }, true);
        }, true);
    }
}
