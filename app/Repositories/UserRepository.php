<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use App\User;

class UserRepository extends BaseRepository
{

    public function model()
    {
        return User::class;
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
        ];
        if (!empty($data['role_passenger'])) {
            $attributes['permissions'] |= ($this->model())::PASSENGER_PERMISSION;
        }
        if (!empty($data['role_driver'])) {
            $attributes['permissions'] |= ($this->model())::DRIVER_PERMISSION;
        }
        return parent::create($attributes);
    }
}