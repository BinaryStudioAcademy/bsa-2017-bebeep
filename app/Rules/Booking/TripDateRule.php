<?php

namespace App\Rules\Booking;

use App\User;
use Carbon\Carbon;
use App\Models\Trip;
use App\Services\Requests\CreateBookingRequest;

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
