<?php

namespace App\Transformers\DriverTrip;

use App\User;
use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract
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
            'avatar' => $user->getAvatarUrl(),
        ];
    }
}
