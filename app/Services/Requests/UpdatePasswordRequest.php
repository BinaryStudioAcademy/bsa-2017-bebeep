<?php

namespace App\Services\Requests;

interface UpdatePasswordRequest
{
    public function getPassword(): string;
}
