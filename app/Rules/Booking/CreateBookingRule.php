<?php

namespace App\Rules\Booking;

use App\User;
use App\Models\Trip;
use App\Services\Requests\CreateBookingRequest;

interface CreateBookingRule
{
    public function validate(Trip $trip, User $user, CreateBookingRequest $request): bool;
}
