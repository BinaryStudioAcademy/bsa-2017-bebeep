<?php

namespace App\Services\Helpers\Subscriptions\Filters;

use App\Models\Trip;
use App\Models\Filter;
use Illuminate\Support\Facades\DB;

class RatingFilter implements Contracts\SubscriptionFilter
{
    /**
     * {@inheritdoc}
     */
    public function support(Filter $filter): bool
    {
        return $filter->name === 'rating';
    }

    /**
     * {@inheritdoc}
     */
    public function isSatisfied(Filter $filter, Trip $trip): bool
    {
        $params = $filter->parameters;

        /** @var \App\User $driver */
        $driver = $trip->user;
        $reviews = (int) round(
            $driver->receivedReviews()
                ->select(DB::raw('AVG(`mark`) as avg'))
                ->first()['avg']
        );
        $rating = (int) $params['value'];

        return $reviews === $rating;
    }
}
