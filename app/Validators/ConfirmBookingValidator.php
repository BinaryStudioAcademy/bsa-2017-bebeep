<?php

namespace App\Validators;

use App\User;
use App\Models\Trip;
use App\Models\Booking;
use App\Rules\BookingConfirm\Contracts\ConfirmRule;

class ConfirmBookingValidator
{
    /**
     * @var ConfirmRule[]
     */
    protected $rules;

    /**
     * UpdateTripValidator constructor.
     *
     * @param ConfirmRule[] ...$rules
     */
    public function __construct(ConfirmRule ...$rules)
    {
        $this->rules = $rules;
    }

    /**
     * Validation method.
     *
     * @param Trip $trip
     * @param Booking $booking
     * @param User $user
     * @return bool
     */
    public function validate(Trip $trip, Booking $booking, User $user): bool
    {
        foreach ($this->rules as $rule) {
            $rule->validate($trip, $booking, $user);
        }

        return true;
    }
}
