<?php

namespace App\Transformers\Search;

use App\User;
use Carbon\Carbon;
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
        return [
            'full_name' => $user->first_name.' '.$user->last_name,
            'age' => Carbon::now()->year - $user->birth_date->year,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'birth_date' => $user->birth_date->timestamp,
            'photo' => $user->getAvatarUrl(),
        ];
    }
}
