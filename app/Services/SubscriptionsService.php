<?php

namespace App\Services;

use App\User;
use App\Models\Subscription;
use Illuminate\Support\Collection;
use App\Repositories\Contracts\SubscriptionRepository;
use App\Services\Requests\Subscriptions\EditSubscriptionRequest;
use App\Services\Requests\Subscriptions\StatusSubscriptionRequest;

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

    /**
     * {@inheritdoc}
     */
    public function getByUser(User $user): Collection
    {
        return collect($this->subscriptionRepository->findByField('email', $user->email));
    }

    /**
     * {@inheritdoc}
     */
    public function changeStatus(StatusSubscriptionRequest $request, Subscription $subscription): void
    {
        $subscription->is_active = $request->isActive();

        $this->subscriptionRepository->save($subscription);
    }

    /**
     * {@inheritdoc}
     */
    public function edit(EditSubscriptionRequest $request, Subscription $subscription): void
    {
        // TODO: Implement edit() method.
    }

    /**
     * {@inheritdoc}
     */
    public function delete(Subscription $subscription): void
    {
        $this->subscriptionRepository->delete($subscription->id);
    }
}
