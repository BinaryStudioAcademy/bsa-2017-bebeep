<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Exceptions\User\VerifyException;
use App\Http\Requests\ResetPasswordRequest;
use App\Services\Contracts\PasswordService;
use App\Http\Requests\ForgotPasswordRequest;
use App\Exceptions\User\PasswordResetException;

class PasswordResetsController extends Controller
{
    protected $passwordService;

    public function __construct(PasswordService $passwordService)
    {
        $this->passwordService = $passwordService;
    }

    public function forgot(ForgotPasswordRequest $request)
    {
        try {
            $this->passwordService->forgot($request);
        } catch (VerifyException $e) {
            return response()->json(['email' => [$e->getMessage()]], 422);
        }

        return response()->json();
    }

    public function reset(ResetPasswordRequest $request)
    {
        try {
            $this->passwordService->reset($request);
        } catch (PasswordResetException $e) {
            return response()->json([$e->getField() => [$e->getMessage()]], 422);
        }

        return response()->json();
    }
}
