<?php

namespace App\Transformers\User;

use App\User;
use League\Fractal\TransformerAbstract;

/**
 * Class DriverPublicProfileTransformer.
 */
class DriverPublicProfileTransformer extends TransformerAbstract
{
    /**
     * Transform the driver public profile data.
     *
     * @param \App\User $user
     *
     * @return array
     */
    public function transform(User $user) : array
    {
        return [
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'birth_date' => $user->birth_date ? $user->birth_date->format('Y-m-d') : null,
            'about_me' => $user->about_me,
            'img' => $user->getAvatarUrl(),
            'car' => [
                'model' => 'BMW X5',
                'color' => 'blue',
                'img' => null,
            ],
        ];
    }
}
