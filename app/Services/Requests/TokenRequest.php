<?php

namespace App\Services\Requests;

interface TokenRequest
{
    public function getToken(): string;
}
