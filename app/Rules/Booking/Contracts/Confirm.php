<?php

namespace App\Rules\Booking\Contracts;

use App\Models\Booking;
use App\Models\Trip;
use App\User;

interface Confirm
{
    public function validate(Trip $trip, Booking $booking, User $user) : bool;
}