<?php

namespace App\Rules\Booking;

use App\User;
use App\Models\Trip;
use App\Services\Requests\CreateBookingRequest;
use App\Repositories\Contracts\BookingRepository;

class UserHasNotActiveBookingsForTrip implements CreateBookingRule
{
    private $bookingRepository;

    public function __construct(BookingRepository $bookingRepository)
    {
        $this->bookingRepository = $bookingRepository;
    }

    public function validate(Trip $trip, User $user, CreateBookingRequest $request): bool
    {
        if ($this->bookingRepository->getTripNotDeclinedBookingsCountForUser($trip, $user) > 0) {
            throw new \Exception(__('Rules/Booking/Rules.user_already_booked_for_this_trip'));
        }

        return true;
    }
}
