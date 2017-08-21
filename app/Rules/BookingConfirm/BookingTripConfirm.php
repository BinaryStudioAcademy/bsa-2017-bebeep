<?php

namespace App\Rules\BookingConfirm;

use App\Exceptions\Booking\BookingConfirmException;
use App\Models\Booking;
use App\Models\Trip;
use App\User;

class BookingTripConfirm implements Contracts\ConfirmRule
{
    public function validate(Trip $trip, Booking $booking, User $user): bool
    {
        if ($trip->id !== $booking->trip_id) {
            throw new BookingConfirmException(__("Rules/BookingConfirm/Confirm.booking_is_not_belong_trip"));
        }
        return true;
    }
}
