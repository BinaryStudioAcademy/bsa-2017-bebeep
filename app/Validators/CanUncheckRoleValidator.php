<?php

namespace App\Validators;

use Auth;
use Illuminate\Contracts\Validation\Validator;

class CanUncheckRoleValidator
{
    const ERROR_MSG = 'The :attribute cannot be unchecked.';

    /**
     * Validate the role can uncheck state.
     *
     * @param string $attribute
     * @param bool $value
     * @param array $parameters
     * @param \Illuminate\Contracts\Validation\Validator $validator
     *
     * @return bool
     */
    public function validate(
        string $attribute,
        bool $value,
        array $parameters,
        Validator $validator
    ): bool {
        if (! $parameters || ! Auth::user() || ! $parameters[0]) {
            return false;
        }

        $hasRelation = strtolower($parameters[0]) === 'driver' ? 'hasTrip' : 'hasBooking';

        return $value || false === $value && false === Auth::user()->$hasRelation();
    }
}
