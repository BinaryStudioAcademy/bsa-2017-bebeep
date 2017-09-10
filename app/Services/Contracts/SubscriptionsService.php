<?php

namespace App\Services\Contracts;

use App\User;
use App\Models\Trip;
use App\Models\Subscription;
use Illuminate\Support\Collection;
use App\Services\Requests\CreateSubscriptionsRequest;
use App\Services\Requests\Subscriptions\EditSubscriptionRequest;
use App\Services\Requests\Subscriptions\StatusSubscriptionRequest;

interface SubscriptionsService
{
    /**
     * @param Trip $trip
     * @return Collection
     */
    public function getSubscriptionsByTrip(Trip $trip) : Collection;

    /**
     * @param CreateSubscriptionsRequest $request
     *
     * @return mixed
     */
    public function create(CreateSubscriptionsRequest $request);

    /**
     * @param User $user
     * @return Collection
     */
    public function getByUser(User $user) : Collection;

    /**
     * @param StatusSubscriptionRequest $request
     * @param Subscription $subscription
     */
    public function changeStatus(StatusSubscriptionRequest $request, Subscription $subscription) : void;

    /**
     * @param EditSubscriptionRequest $request
     * @param Subscription $subscription
     */
    public function edit(EditSubscriptionRequest $request, Subscription $subscription) : Subscription;

    /**
     * @param Subscription $subscription
     */
    public function delete(Subscription $subscription) : void;
}
