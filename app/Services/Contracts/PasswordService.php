<?php

namespace App\Services\Contracts;

use App\Services\Requests\ForgotPasswordRequest;
use App\Services\Requests\ResetPasswordRequest;

interface PasswordService
{
    public function forgot(ForgotPasswordRequest $request);
    public function reset(ResetPasswordRequest $request);
}