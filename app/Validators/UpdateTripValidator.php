<?php

namespace App\Validators;

use App\User;
use App\Models\Trip;
use App\Rules\UpdateTrip\UpdateTripRule;

class UpdateTripValidator
{
    /**
     * @var UpdateTripRule[]
     */
    protected $rules;

    /**
     * UpdateTripValidator constructor.
     *
     * @param UpdateTripRule[] ...$rules
     */
    public function __construct(UpdateTripRule ...$rules)
    {
        $this->rules = $rules;
    }

    /**
     * Validation method.
     *
     * @param Trip $trip
     * @param User $user
     * @return bool
     */
    public function validate(Trip $trip, User $user): bool
    {
        foreach ($this->rules as $rule) {
            $rule->validate($trip, $user);
        }

        return true;
    }
}
