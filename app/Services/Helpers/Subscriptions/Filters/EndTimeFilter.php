<?php

namespace App\Services\Helpers\Subscriptions\Filters;

use App\Models\Trip;
use App\Models\Filter;

class EndTimeFilter implements Contracts\SubscriptionFilter
{
    /**
     * {@inheritdoc}
     */
    public function support(Filter $filter): bool
    {
        return $filter->name === 'time';
    }

    /**
     * {@inheritdoc}
     */
    public function isSatisfied(Filter $filter, Trip $trip): bool
    {
        $params = $filter->parameters;

        /** Need a timestamp for timezone. */
        $endTime = (int) $params['end'];

        return $trip->start_at->timestamp <= $endTime;
    }
}
