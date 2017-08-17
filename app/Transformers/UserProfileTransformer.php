<?php

namespace App\Transformers;

use App\User;
use League\Fractal\TransformerAbstract;

/**
 * Class UserProfileTransformer
 * @package namespace App\Transformers;
 */
class UserProfileTransformer extends TransformerAbstract
{
    /**
     * Transform the user profile general data.
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
            'email' => $user->email,
            'phone' => $user->phone,
            'birth_date' => $user->birth_date ? $user->birth_date->format('Y-m-d') : null,
            'about_me' => $user->about_me,
            'role_driver' => $user->isDriver(),
            'role_passenger' => $user->isPassenger(),
            'can_uncheck_role_driver' => !$user->hasTrip(),
            'can_uncheck_role_passenger' => !$user->hasBooking(),
        ];
    }
}
