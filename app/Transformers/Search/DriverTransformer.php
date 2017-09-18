<?php

namespace App\Transformers\Search;

use App\User;
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
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'birth_date' => $user->birth_date ? $user->birth_date->format('Y-m-d') : null,
            'photo' => $user->getAvatarUrl(),
        ];
    }
}
