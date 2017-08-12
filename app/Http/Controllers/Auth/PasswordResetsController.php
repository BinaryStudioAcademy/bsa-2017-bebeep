<?php

namespace App\Http\Controllers\Auth;

use App\Exceptions\User\PasswordResetException;
use App\Exceptions\User\VerifyException;
use App\Http\Controllers\Controller;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Services\Contracts\PasswordService;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Validator;

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
    }

    public function reset(ResetPasswordRequest $request)
    {
        try {
            $this->passwordService->reset($request);
        } catch (PasswordResetException $e) {
            $code = [
                PasswordResetException::INVALID_USER => 'email',
                PasswordResetException::INVALID_TOKEN => 'token',
                PasswordResetException::INVALID_PASSWORD => 'password',
            ];
            return response()->json([$code[$e->getCode()] => [$e->getMessage()]], 422);
        }
        return response()->json();
    }
}
