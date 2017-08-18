<?php

namespace App\Rules\UpdateTrip;

use App\User;
use App\Models\Trip;

interface UpdateTripRule
{
    /**
     * Owner rule for update trip rule.
     *
     * @param Trip $trip
     * @param User $user
     * @return bool
     */
    public function validate(Trip $trip, User $user): bool;
}
