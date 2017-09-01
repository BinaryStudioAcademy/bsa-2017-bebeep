<?php

namespace App\Services;

use App\User;
use App\Repositories\Contracts\TripRepository;
use App\Services\Contracts\UserPublicProfileService as UserPublicProfileServiceContract;

class UserPublicProfileService implements UserPublicProfileServiceContract
{
    /**
     * @param \App\Repositories\Contracts\TripRepository $tripRepository
     */
    public function __construct(TripRepository $tripRepository)
    {
        $this->tripRepository = $tripRepository;
    }

    /**
     * {@inheritdoc}
     */
    public function getDriverProfile(User $user) : ?User
    {
        if (! $user->isDriver()) {
            return null;
        }

        $user->trips_count = $this->tripRepository->getPastTripsCountForDriver($user);

        return $user;
    }

    /**
     * {@inheritdoc}
     */
    public function getPassengerProfile(User $user) : ?User
    {
        if (! $user->isPassenger()) {
            return null;
        }

        $user->trips_count = $this->tripRepository->getPastTripsCountForPassenger($user);

        return $user;
    }
}
