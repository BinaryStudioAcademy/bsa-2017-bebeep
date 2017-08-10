<?php

namespace App\Http\Controllers\Auth;

use App\Exceptions\User\PasswordResetException;
use App\Http\Controllers\Controller;
use App\Http\Requests\ResetPasswordRequest;
use App\Services\Contracts\PasswordService;
use Illuminate\Foundation\Auth\ResetsPasswords;

class ResetPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    use ResetsPasswords;

    protected $passwordService;

    public function __construct(PasswordService $passwordService)
    {
        $this->passwordService = $passwordService;
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
