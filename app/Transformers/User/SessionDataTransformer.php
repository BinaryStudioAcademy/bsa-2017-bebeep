<?php

namespace App\Transformers\User;

use App\User;
use League\Fractal\TransformerAbstract;

/**
 * Class SessionDataTransformer.
 */
class SessionDataTransformer extends TransformerAbstract
{
    /**
     * Transform the session user base data.
     *
     * @param \App\User $user
     *
     * @return array
     */
    public function transform(User $user): array
    {
        return [
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'avatar' => $user->getAvatarUrl(),
            'permissions' => $user->permissions,
        ];
    }
}
