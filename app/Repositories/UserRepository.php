<?php

namespace App\Repositories;

use App\User;
use Prettus\Repository\Eloquent\BaseRepository;

class UserRepository extends BaseRepository
{
    /**
     * @return string
     */
    public function model()
    {
        return User::class;
    }

    /**
     * @param User $user
     * @return User
     */
    public function save(User $user) : User
    {
        $user->save();

        return $user;
    }
}
