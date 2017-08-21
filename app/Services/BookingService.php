<?php

namespace App\Services;

use App\Models\Trip;
use App\Services\Requests\CreateBookingRequest;
use App\User;
use App\Validators\CreateBookingValidator;

class BookingService
{
    private $createBookingValidator;

    public function __construct(CreateBookingValidator $createBookingValidator)
    {
        $this->createBookingValidator = $createBookingValidator;
    }

    public function create(Trip $trip, CreateBookingRequest $request, User $user)
    {
        $this->createBookingValidator->validate($trip, $user, $request);
    }
}
