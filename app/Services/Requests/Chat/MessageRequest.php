<?php

namespace App\Services\Requests\Chat;

interface MessageRequest
{
    public function getMessage() : string;
}
