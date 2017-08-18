<?php

namespace App\Rules\DeleteTrip;

use App\User;
use App\Models\Trip;

interface DeleteTripRule
{
    public function validate(Trip $trip, User $user): bool;
}
