<?php

namespace App\Services\Requests;

interface VerifyUserRequest
{
    public function getEmail(): ?string;

    public function getToken(): ?string;
}
