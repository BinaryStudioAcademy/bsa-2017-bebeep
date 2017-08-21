<?php

namespace App\Transformers\DetailTrip;

use App\User;
use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @param User $user
     * @return array
     */
    public function transform(User $user)
    {
        return [
            "id" => $user->id,
            "last_name" => $user->last_name,
            "first_name" => $user->first_name,
            "full_name" => $user->last_name . ' ' . $user->first_name,
            "birth_date" => (string)$user->birth_date,
            "birth_date_x" => $user->birth_date->timestamp,
            "photo" => $user->getAvatarUrl()
        ];
    }
}
