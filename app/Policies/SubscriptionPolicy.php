<?php

namespace App\Policies;

use App\User;
use App\Models\Subscription;
use Illuminate\Auth\Access\HandlesAuthorization;

class SubscriptionPolicy
{
    use HandlesAuthorization;

    public function delete(User $user, Subscription $subscription)
    {
        return $user->email === $subscription->email;
    }

    public function edit(User $user, Subscription $subscription)
    {
        return $user->email === $subscription->email;
    }

    public function status(User $user, Subscription $subscription)
    {
        return $user->email === $subscription->email;
    }
}
