<?php

namespace App\Repositories;

use App\Models\Filter;
use App\Models\Subscription;
use Prettus\Repository\Eloquent\BaseRepository;

class SubscriptionRepository extends BaseRepository implements Contracts\SubscriptionRepository
{
    /**
     * @return string
     */
    public function model()
    {
        return Subscription::class;
    }

    /**
     * {@inheritdoc}
     */
    public function save(Subscription $subscription): Subscription
    {
        $subscription->push();

        return $subscription;
    }

    /**
     * {@inheritdoc}
     */
    public function setFilters(Subscription $subscription, Filter ...$filters) : Subscription
    {
        $subscription->filters()->saveMany($filters);

        return $subscription;
    }
}
