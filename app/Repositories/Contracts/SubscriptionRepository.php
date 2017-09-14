<?php

namespace App\Repositories\Contracts;

use App\Models\Filter;
use App\Models\Subscription;
use Prettus\Repository\Contracts\RepositoryInterface;
use Prettus\Repository\Contracts\RepositoryCriteriaInterface;

interface SubscriptionRepository extends RepositoryInterface, RepositoryCriteriaInterface
{
    /**
     * @param Subscription $subscription
     * @return Subscription
     */
    public function save(Subscription $subscription) : Subscription;

    /**
     * @param Subscription $subscription
     * @param Filter[] ...$filters
     * @return Subscription
     */
    public function setFilters(Subscription $subscription, Filter ...$filters) : Subscription;
}
