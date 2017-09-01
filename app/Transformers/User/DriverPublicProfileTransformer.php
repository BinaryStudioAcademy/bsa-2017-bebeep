<?php

namespace App\Transformers\User;

use App\User;
use League\Fractal\TransformerAbstract;
use App\Transformers\Vehicle\DriverProfile\VehicleTransformer;

/**
 * Class DriverPublicProfileTransformer.
 */
class DriverPublicProfileTransformer extends TransformerAbstract
{
    /**
     * @var array
     */
    protected $availableIncludes = [
        'vehicle',
    ];

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
            'id' => $user->id,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'birth_date' => $user->birth_date ? $user->birth_date->timestamp : null,
            'about_me' => $user->about_me,
            'photo' => $user->getAvatarUrl(),
            'vehicle' => $user->vehicle,
            'trips_count' => $user->trips_count,
            'email_is_verified' => $user->is_verified,
            'created_at' => $user->created_at->timestamp,
        ];
    }

    /**
     * @param \App\User $user
     *
     * @return \League\Fractal\Resource\Item
     */
    public function includeVehicle(User $user)
    {
        return $this->item($user->vehicles->first(), new VehicleTransformer());
    }
}
