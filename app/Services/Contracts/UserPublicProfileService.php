<?php

namespace App\Services\Contracts;

use App\User;

interface UserPublicProfileService
{
    /**
     * Get the driver public profile data.
     *
     * @param \App\User $user
     *
     * @return \App\User|null
     */
    public function getDriverProfile(User $user) : ?User;

    /**
     * Get the passenger public profile data.
     *
     * @param \App\User $user
     *
     * @return \App\User|null
     */
    public function getPassengerProfile(User $user) : ?User;
}
