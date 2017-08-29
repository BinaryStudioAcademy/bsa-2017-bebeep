<?php

namespace App\Services\Helpers;

use App\User;
use App\Services\Requests\SaveCarRequestInterface;

class SaveVehicleRequest implements SaveCarRequestInterface
{
    protected $data;
    protected $user;

    public function __construct(array $data, User $user)
    {
        $this->data = $data;
        $this->user = $user;
    }

    public function getBrand(): string
    {
        return $this->data['brand'] ?? '';
    }

    public function getModel(): string
    {
        return $this->data['model'] ?? '';
    }

    public function getColor(): string
    {
        return $this->data['color'] ?? '';
    }

    public function getBody(): string
    {
        return $this->data['body'] ?? '';
    }

    public function getSeats(): int
    {
        return $this->data['seats'] ?? 1;
    }

    public function getYear(): int
    {
        return $this->data['year'] ?? 0;
    }

    public function getPhoto()
    {
        return $this->data['photo'] ?? '';
    }

    public function getUserId(): int
    {
        return $this->user->id;
    }
}
