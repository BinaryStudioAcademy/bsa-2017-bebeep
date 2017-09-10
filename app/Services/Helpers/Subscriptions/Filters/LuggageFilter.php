<?php

namespace App\Services\Helpers\Subscriptions\Filters;

use App\Models\Trip;
use App\Models\Filter;

class LuggageFilter implements Contracts\SubscriptionFilter
{
    /**
     * {@inheritdoc}
     */
    public function support(Filter $filter): bool
    {
        return $filter->name === 'luggage';
    }

    /**
     * {@inheritdoc}
     */
    public function isSatisfied(Filter $filter, Trip $trip): bool
    {
        $params = $filter->parameters;
        $luggage = (int) $params['value'];

        return $trip->luggage_size >= $luggage;
    }
}
