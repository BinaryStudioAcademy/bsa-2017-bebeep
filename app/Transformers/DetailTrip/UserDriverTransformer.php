<?php

namespace App\Transformers\DetailTrip;

use App\User;
use League\Fractal\TransformerAbstract;

class UserDriverTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @param \App\User $user
     * @return array
     */
    public function transform(User $user) : array
    {
        return [
            'id' => $user->id,
            'full_name' => $user->getFullName(),
            'birth_date' => $user->birth_date ? $user->birth_date->format('Y-m-d') : null,
            'photo' => $user->getAvatarUrl(),
        ];
    }
}
