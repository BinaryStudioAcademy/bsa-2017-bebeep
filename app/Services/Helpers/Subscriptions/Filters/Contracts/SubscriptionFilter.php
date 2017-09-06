<?php

namespace App\Services\Helpers\Subscriptions\Filters\Contracts;

use App\Models\Trip;
use App\Models\Filter;

interface SubscriptionFilter
{
    /**
     * Is the filter supported.
     *
     * @param Filter $filter
     * @return bool
     */
    public function support(Filter $filter) : bool;

    /**
     * @param Filter $filter
     * @param Trip $trip
     * @return bool
     */
    public function isSatisfied(Filter $filter, Trip $trip) : bool;
}
