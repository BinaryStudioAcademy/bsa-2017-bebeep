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
    public function save(User $user): User
    {
        $user->save();

        return $user;
    }

    /**
     * Update the user data.
     *
     * @param \App\User $user
     * @param int $id
     *
     * @return \App\User
     */
    public function updateUser(User $user, int $id) : User
    {
        return $this->update($user->toArray(), $id);
    }

    /**
     * Get user by email.
     *
     * @param string $email
     * @return User
     */
    public function getUserByEmail(string $email)
    {
        return User::where('email', $email)->first();
    }
}
