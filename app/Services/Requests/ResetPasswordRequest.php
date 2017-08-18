<?php

namespace App\Services\Requests;

interface ResetPasswordRequest
{
    public function getEmail();

    public function getToken();

    public function getPass();

    public function getPasswordConfirmation();
}
