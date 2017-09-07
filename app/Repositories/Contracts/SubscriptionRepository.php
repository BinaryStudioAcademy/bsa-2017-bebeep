<?php

namespace App\Repositories\Contracts;

use App\Models\Subscription;
use Prettus\Repository\Contracts\RepositoryInterface;
use Prettus\Repository\Contracts\RepositoryCriteriaInterface;

interface SubscriptionRepository extends RepositoryInterface, RepositoryCriteriaInterface
{
    /**
     * @param Subscription $subscription
     *
     * @return $subscription
     */
    public function save(Subscription $subscription);
}
