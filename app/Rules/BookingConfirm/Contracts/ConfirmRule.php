<?php

namespace App\Rules\BookingConfirm\Contracts;

use App\User;
use App\Models\Trip;
use App\Models\Booking;

interface ConfirmRule
{
    public function validate(Trip $trip, Booking $booking, User $user) : bool;
}
