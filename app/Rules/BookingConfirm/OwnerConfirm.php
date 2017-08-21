<?php

namespace App\Rules\BookingConfirm;

use App\User;
use App\Models\Trip;
use App\Models\Booking;
use App\Exceptions\Booking\BookingConfirmException;

class OwnerConfirm implements Contracts\ConfirmRule
{
    public function validate(Trip $trip, Booking $booking, User $user): bool
    {
        if ($trip->user_id !== $user->id) {
            throw new BookingConfirmException(__('Rules/BookingConfirm/Confirm.user_is_not_owner_of_trip'));
        }

        return true;
    }
}
