<?php

namespace App\Repositories\Contracts;

use App\Models\Subscription;
use App\Http\Requests\DTO\FilterDTO;
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
     * @param FilterDTO[] ...$filters
     * @return Subscription
     */
    public function setFilters(Subscription $subscription, FilterDTO ...$filters) : Subscription;
}
