<?php

namespace App\Validators;

class RoutesExistsForTripValidator
{
    const ERROR_MSG = 'Specified routes does not exists for trip';

    /**
     * @param $attribute
     * @param $value
     * @param $parameters
     * @param $validator
     * @return bool
     */
    public function validate($attribute, $value, $parameters, $validator): bool
    {
        if (empty($parameters) || empty($value)) {
            return false;
        }

        $parameters = collect($parameters);
        $value = collect($value);
        $diff = $value->diff($parameters);

        return $diff->count() <= 0;
    }
}
