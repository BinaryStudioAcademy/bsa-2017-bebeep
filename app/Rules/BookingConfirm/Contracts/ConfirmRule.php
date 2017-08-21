<?php

namespace App\Rules\BookingConfirm\Contracts;

use App\Models\Booking;
use App\Models\Trip;
use App\User;

interface ConfirmRule
{
    public function validate(Trip $trip, Booking $booking, User $user) : bool;
}
