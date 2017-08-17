<?php

namespace App\Services\Requests;

interface LoginRequest
{
    public function getEmail(): string;

    public function getPassword(): string;
}
