<?php

namespace App\Rules\Booking;

use App\Services\Requests\CreateBookingRequest;
use App\User;
use App\Models\Trip;

class TripRoutesHasSeatsRule implements CreateBookingRule
{
    public function validate(Trip $trip, User $user, CreateBookingRequest $request): bool
    {
        foreach ($trip->routes as $route) {
            if ($route->available_seats <= 0) {
                throw new \Exception(__('Rules/Booking/Rules.not_enough_seats'));
            }
        }
        dd($trip->routes->first()->available_seats);

        return true;
    }
}
