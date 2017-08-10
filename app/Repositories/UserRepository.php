<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use App\User;
use Illuminate\Support\Str;

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

    /**
     * @param User $user
     * @return User
     */
    public function changePassword(User $user, string $password) : User
    {
        $user->password = bcrypt($password);
        $user->remember_token = Str::random(60);
        $user->save();
        return $user;
    }
}