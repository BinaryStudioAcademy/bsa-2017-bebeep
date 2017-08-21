<?php

namespace App\Rules\Booking;

use App\Services\Requests\CreateBookingRequest;
use App\User;
use App\Models\Trip;
use Carbon\Carbon;

class TripDateRule implements CreateBookingRule
{
    public function validate(Trip $trip, User $user, CreateBookingRequest $request): bool
    {
        if ($trip->start_at->timestamp < Carbon::now()->timestamp) {
            throw new \Exception(__('Rules/Booking/Rules.trip_is_started'));
        }

        if ($trip->end_at->timestamp <= Carbon::now()->timestamp) {
            throw new \Exception(__('Rules/Booking/Rules.trip_is_ended'));
        }

        return true;
    }
}
