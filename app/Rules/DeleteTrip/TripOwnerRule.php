<?php

namespace App\Rules\DeleteTrip;

use App\User;
use App\Models\Trip;
use App\Exceptions\User\UserHasNotPermissionsToDeleteTripException;

class TripOwnerRule implements DeleteTripRule
{
    public function validate(Trip $trip, User $user): bool
    {
        if ($trip->user_id != $user->id) {
            throw new UserHasNotPermissionsToDeleteTripException(__('Rules/DeleteTrip/TripOwnerRule.user_is_not_owner_trip'));
        }

        return true;
    }
}
