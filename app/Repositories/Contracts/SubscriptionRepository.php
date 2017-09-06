<?php

namespace App\Repositories\Contracts;

use App\Models\Subscription;
use Prettus\Repository\Contracts\RepositoryInterface;
use Prettus\Repository\Contracts\RepositoryCriteriaInterface;

interface SubscriptionRepository extends RepositoryInterface, RepositoryCriteriaInterface
{
    public function save(Subscription $subscription) : Subscription;
}
