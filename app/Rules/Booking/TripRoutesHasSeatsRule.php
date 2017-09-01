<?php

namespace App\Rules\Booking;

use App\User;
use App\Models\Trip;
use Illuminate\Support\Collection;
use App\Services\Requests\CreateBookingRequest;

class TripRoutesHasSeatsRule implements CreateBookingRule
{
    public function validate(Trip $trip, User $user, CreateBookingRequest $request): bool
    {
        /** @var Collection $routes */
        $routes = $trip->routes;
        $routes->whereIn('id', $request->getRoutes())
            ->each(function ($route) use ($request) {
                if ($route->available_seats < $request->getSeats()) {
                    throw new \Exception(__('Rules/Booking/Rules.not_enough_seats'));
                }
            });

        return true;
    }
}
