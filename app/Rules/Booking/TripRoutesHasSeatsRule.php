<?php

namespace App\Rules\Booking;

use App\User;
use App\Models\Trip;
use App\Services\Requests\CreateBookingRequest;

class TripRoutesHasSeatsRule implements CreateBookingRule
{
    public function validate(Trip $trip, User $user, CreateBookingRequest $request): bool
    {
        foreach ($trip->routes as $route) {
            if ($route->available_seats < $request->getSeats()) {
                throw new \Exception(__('Rules/Booking/Rules.not_enough_seats'));
            }
        }

        return true;
    }
}
