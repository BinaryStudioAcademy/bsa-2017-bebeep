<?php

namespace App\Exceptions\User;

class PasswordResetException extends \Exception
{
    const INVALID_PASSWORD = 1;
    const INVALID_TOKEN = 2;
    const INVALID_USER = 3;
}