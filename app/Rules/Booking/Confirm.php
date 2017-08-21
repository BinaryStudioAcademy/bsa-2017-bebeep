<?php

namespace App\Rules\Booking;

use App\Models\Booking;
use App\Models\Trip;
use App\User;

class Confirm implements Contracts\Confirm
{
    public function validate(Trip $trip, Booking $booking, User $user): bool
    {
        return true;
    }
}