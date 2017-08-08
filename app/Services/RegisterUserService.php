<?php

namespace App\Services;

use App\User;

class RegisterUserService
{
    /**
     * @param array $data
     * @return User
     */
    public function register(array $data): User
    {
        $attributes = [
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'password' => bcrypt($data['password']),
            'permissions' => 0,
        ];

        if (! empty($data['role_passenger'])) {
            $attributes['permissions'] |= User::PASSENGER_PERMISSION;
        }

        if (! empty($data['role_driver'])) {
            $attributes['permissions'] |= User::DRIVER_PERMISSION;
        }

        return new User($attributes);
    }

    /**
     * @param array $data
     * @return User|null
     */
    public function findUserToVerify(array $data) : ?User
    {
        if (empty($data['email']) || empty($data['token'])) {
            return null;
        }

        return User::where([
            'email' => $data['email'],
            'verification_token' => $data['token'],
            'is_verified' => false,
        ])->first();
    }
}