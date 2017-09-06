<?php

namespace App\Services\Contracts;

use App\Models\Subscription;
use App\Services\Requests\Subscriptions\EditSubscriptionRequest;
use App\User;
use Illuminate\Support\Collection;
use App\Services\Requests\Subscriptions\StatusSubscriptionRequest;

interface SubscriptionsService
{
    public function getByUser(User $user) : Collection;

    public function changeStatus(StatusSubscriptionRequest $request, Subscription $subscription) : void;

    public function edit(EditSubscriptionRequest $request, Subscription $subscription) : void;

    public function delete(Subscription $subscription) : void;
}
