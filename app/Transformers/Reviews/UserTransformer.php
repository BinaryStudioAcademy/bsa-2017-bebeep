<?php

namespace App\Transformers\Reviews;

use App\User;
use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(User $user)
    {
        return [
            'id' => $user->id,
            'full_name' => $user->last_name.' '.$user->first_name,
            'last_name' => $user->last_name,
            'first_name' => $user->first_name,
            'photo' => $user->getAvatarUrl(),
        ];
    }
}
