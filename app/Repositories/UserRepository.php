<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;

class UserRepository extends BaseRepository
{

    public function model()
    {
        return "App\\User";
    }

    /**
     * {@inheritdoc}
     */
    public function create(array $data)
    {
        $attributes = [
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'password' => bcrypt($data['password']),
            'permissions' => 0,
            'is_verified' => false
        ];
        if (isset($data['role_passenger']) && $data['role_passenger'] === '1') {
            $attributes['permissions'] |= ($this->model())::PASSENGER_PERMISSION;
        }
        if (isset($data['role_driver']) && $data['role_driver'] === '1') {
            $attributes['permissions'] |= ($this->model())::DRIVER_PERMISSION;
        }
        return parent::create($attributes);
    }
}