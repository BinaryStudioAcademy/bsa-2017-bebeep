<?php

namespace App\Services\Helpers\Subscriptions\Filters;

use App\Models\Trip;
use App\Models\Filter;

class StartPriceFilter implements Contracts\SubscriptionFilter
{
    /**
     * {@inheritdoc}
     */
    public function support(Filter $filter): bool
    {
        return $filter->name === 'price';
    }

    /**
     * {@inheritdoc}
     */
    public function isSatisfied(Filter $filter, Trip $trip): bool
    {
        $params = $filter->parameters;
        $price = (float) $params['from'];

        return $trip->price >= $price;
    }
}
