<?php

namespace App\Http\Controllers\Auth;

use App\Exceptions\User\PasswordResetException;
use App\Http\Controllers\Controller;
use App\Http\Requests\ResetPasswordRequest;
use App\Services\Contracts\PasswordService;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Validator;

class ResetPasswordController extends Controller
{
    protected $passwordService;

    public function __construct(PasswordService $passwordService)
    {
        $this->passwordService = $passwordService;
    }

    public function reset(ResetPasswordRequest $request)
    {
        /** @var  \Illuminate\Validation\Validator  $validator */
        $validator = Validator::make([
            'email' => $request->getEmail(),
            'token' => $request->getToken(),
            'password' => $request->getPass()
        ],[
            'email' => "required|email",
            'token' => "required",
            'password' => "required|min:6",
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
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
