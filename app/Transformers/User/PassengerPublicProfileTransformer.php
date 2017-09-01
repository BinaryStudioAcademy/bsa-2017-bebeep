<?php

namespace App\Transformers\User;

use App\User;
use League\Fractal\TransformerAbstract;

/**
 * Class PassengerPublicProfileTransformer.
 */
class PassengerPublicProfileTransformer extends TransformerAbstract
{
    /**
     * Transform the passenger public profile data.
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
            'photo' => $user->getAvatarUrl(),
            'trips_count' => $user->trips_count,
            'email_is_verified' => $user->is_verified,
            'created_at' => $user->created_at->timestamp,
        ];
    }
}
