<?php

namespace App\Validators;

use Auth;
use Hash;
use Illuminate\Contracts\Validation\Validator;

class IsPasswordCurrentValidator
{
    const ERROR_MSG = 'This password is not the current one.';

    /**
     * Validate whether this password is the current one.
     *
     * @param string $attribute
     * @param string $value
     * @param array $parameters
     * @param \Illuminate\Contracts\Validation\Validator $validator
     *
     * @return bool
     */
    public function validate(
        string $attribute,
        string $value,
        array $parameters,
        Validator $validator
    ): bool {
        if (! Auth::user()) {
            return false;
        }

        return Hash::check($value, Auth::user()->password);
    }
}
