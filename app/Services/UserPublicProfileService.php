<?php

namespace App\Services;

use App\User;
use App\Services\Contracts\UserPublicProfileService as UserPublicProfileServiceContract;

class UserPublicProfileService implements UserPublicProfileServiceContract
{
    /**
     * {@inheritdoc}
     */
    public function getDriverProfile(User $user) : ?User
    {
        return !$user->isDriver() ? null : $user;
    }

    /**
     * {@inheritdoc}
     */
    public function getPassengerProfile(User $user) : User
    {
        return !$user->isPassenger() ? null : $user;
    }
}
