<?php

namespace App\Services\Contracts;

use App\Services\Requests\{
    ResetPasswordRequest,
    ForgotPasswordRequest,
    UpdatePasswordRequest
};

interface PasswordService
{
    /**
     * Forgot the user password.
     *
     * @param \App\Services\Requests\ForgotPasswordRequest $request
     * @return void
     */
    public function forgot(ForgotPasswordRequest $request): void;

    /**
     * Reset the user password.
     *
     * @param \App\Services\Requests\ResetPasswordRequest $request
     * @return void
     */
    public function reset(ResetPasswordRequest $request): void;
}
