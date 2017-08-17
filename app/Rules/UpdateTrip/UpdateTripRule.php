<?php

namespace App\Rules\UpdateTrip;

use App\Models\Trip;
use App\User;

interface UpdateTripRule
{
    /**
     * Owner rule for update trip rule
     *
     * @param Trip $trip
     * @param User $user
     * @return bool
     */
    public function validate(Trip $trip, User $user) : bool;
}