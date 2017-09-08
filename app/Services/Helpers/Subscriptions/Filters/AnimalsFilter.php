<?php

namespace App\Services\Helpers\Subscriptions\Filters;

use App\Models\Trip;
use App\Models\Filter;

class AnimalsFilter implements Contracts\SubscriptionFilter
{
    const ALLOWED = 1;

    /**
     * {@inheritdoc}
     */
    public function support(Filter $filter): bool
    {
        return $filter->name === 'animals';
    }

    /**
     * {@inheritdoc}
     */
    public function isSatisfied(Filter $filter, Trip $trip): bool
    {
        $params = $filter->parameters;
        $isAllowed = (int) $params['value'] === self::ALLOWED;

        return $trip->is_animals_allowed === $isAllowed;
    }
}
