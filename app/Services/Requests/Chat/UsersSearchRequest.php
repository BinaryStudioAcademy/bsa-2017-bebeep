<?php

namespace App\Services\Requests\Chat;

interface UsersSearchRequest
{
    public function getEmail() : string;

    public function getFirstName() : string;

    public function getLastName() : string;
}
