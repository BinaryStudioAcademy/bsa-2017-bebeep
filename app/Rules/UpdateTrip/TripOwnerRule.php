<?php

namespace App\Rules\UpdateTrip;

use App\User;
use App\Models\Trip;
use App\Exceptions\Trip\UserCantEditTripException;

class TripOwnerRule implements UpdateTripRule
{
    /**
     * Owner rule for update trip rule.
     *
     * @param Trip $trip
     * @param User $user
     * @return bool
     * @throws UserCantEditTripException
     */
    public function validate(Trip $trip, User $user): bool
    {
        if ($trip->user_id != $user->id) {
            throw new UserCantEditTripException("User can't edit this trip");
        }

        return true;
    }
}
