<?php

namespace App\Rules\Booking;

use App\User;
use App\Models\Booking;

interface CancelBookingRule
{
    public function validate(Booking $booking, User $user): bool;
}
