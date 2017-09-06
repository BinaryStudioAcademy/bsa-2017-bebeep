<?php

namespace App\Services;

use App\Models\Subscription;
use App\Repositories\Contracts\SubscriptionRepository;
use App\Services\Requests\Subscriptions\EditSubscriptionRequest;
use App\Services\Requests\Subscriptions\StatusSubscriptionRequest;
use App\User;
use Illuminate\Support\Collection;

class SubscriptionsService implements Contracts\SubscriptionsService
{
    /**
     * @var SubscriptionRepository
     */
    private $subscriptionRepository;

    public function __construct(SubscriptionRepository $subscriptionRepository)
    {
        $this->subscriptionRepository = $subscriptionRepository;
    }

    public function getByUser(User $user): Collection
    {
        return collect($this->subscriptionRepository->findByField('email', $user->email));
    }

    public function changeStatus(StatusSubscriptionRequest $request, Subscription $subscription): void
    {
        // TODO: Implement changeStatus() method.
    }

    public function edit(EditSubscriptionRequest $request, Subscription $subscription): void
    {
        // TODO: Implement edit() method.
    }

    public function delete(Subscription $subscription): void
    {
        // TODO: Implement delete() method.
    }
}