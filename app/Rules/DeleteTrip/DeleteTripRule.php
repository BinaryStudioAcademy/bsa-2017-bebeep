<?php

namespace App\Rules\DeleteTrip;

use App\Models\Trip;
use App\User;

interface DeleteTripRule
{
    public function validate(Trip $trip, User $user): bool;
}
