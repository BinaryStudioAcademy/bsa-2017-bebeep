<?php

namespace App\Rules\BookingConfirm;

use App\User;
use Carbon\Carbon;
use App\Models\Trip;
use App\Models\Booking;
use App\Exceptions\Booking\BookingConfirmException;

class FutureTripConfirm implements Contracts\ConfirmRule
{
    public function validate(Trip $trip, Booking $booking, User $user): bool
    {
        if ($trip->start_at->timestamp < Carbon::now()->timestamp) {
            throw new BookingConfirmException(__('Rules/BookingConfirm/Confirm.trip_has_passed'));
        }

        return true;
    }
}
