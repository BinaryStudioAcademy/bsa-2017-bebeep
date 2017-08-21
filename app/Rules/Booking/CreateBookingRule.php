<?php

namespace App\Rules\Booking;

use App\Services\Requests\CreateBookingRequest;
use App\User;
use App\Models\Trip;

interface CreateBookingRule
{
    public function validate(Trip $trip, User $user, CreateBookingRequest $request): bool;
}
