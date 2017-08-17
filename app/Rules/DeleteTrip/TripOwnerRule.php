<?php

namespace App\Rules\DeleteTrip;

use App\Exceptions\User\UserHasNotPermissionsToDeleteTripException;
use App\Models\Trip;
use App\User;

class TripOwnerRule implements DeleteTripRule
{
    public function validate(Trip $trip, User $user): bool
    {
        if ($trip->user_id != $user->id) {
            throw new UserHasNotPermissionsToDeleteTripException('User is not owner of this trip');
        }

        return true;
    }
}