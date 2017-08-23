<?php

namespace App\Rules\Booking;

use App\Models\Booking;
use App\User;
use Carbon\Carbon;

class BookingTripNotExpiredRule implements CancelBookingRule
{
    public function validate(Booking $booking, User $user): bool
    {
        if ($booking->trip->start_at->timestamp < Carbon::now()->timestamp) {
            throw new \Exception(__('Rules/Booking/Rules.trip_is_started'));
        }

        if ($booking->trip->end_at->timestamp <= Carbon::now()->timestamp) {
            throw new \Exception(__('Rules/Booking/Rules.trip_is_ended'));
        }

        return true;
    }
}
