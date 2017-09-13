<?php

namespace App\Transformers\Search;

use App\User;
use Carbon\Carbon;
use League\Fractal\TransformerAbstract;

class DriverTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(User $user)
    {
        $birthDate = $user->birth_date;

        return [
            'full_name' => $user->first_name.' '.$user->last_name,
            'age' => $birthDate
                ? Carbon::now()->year - $birthDate->year
                : null,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'birth_date' => $birthDate ? $user->birth_date->timestamp : null,
            'photo' => $user->getAvatarUrl(),
        ];
    }
}
