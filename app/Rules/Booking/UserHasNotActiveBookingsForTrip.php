<?php

namespace App\Rules\Booking;

use App\Models\Booking;
use App\User;
use App\Models\Trip;
use App\Services\Requests\CreateBookingRequest;

class UserHasNotActiveBookingsForTrip implements CreateBookingRule
{
    public function validate(Trip $trip, User $user, CreateBookingRequest $request): bool
    {
        if ($trip->bookings()->where(['user_id' => $user->id])->where('status', '!=', Booking::STATUS_DECLINED)->count()) {
            throw new \Exception(__('Rules/Booking/Rules.user_already_booked_for_this_trip'));
        }

        return true;
    }
}
