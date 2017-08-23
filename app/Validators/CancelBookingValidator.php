<?php

namespace App\Validators;

use App\User;
use App\Models\Booking;
use App\Rules\Booking\CancelBookingRule;

class CancelBookingValidator
{
    protected $rules;

    public function __construct(CancelBookingRule ...$rules)
    {
        $this->rules = $rules;
    }

    public function validate(Booking $booking, User $user): bool
    {
        foreach ($this->rules as $rule) {
            $rule->validate($booking, $user);
        }

        return true;
    }
}
