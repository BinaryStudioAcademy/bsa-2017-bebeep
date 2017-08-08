<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\RegisterUserRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\VerifyUserRequest;
use App\Repositories\UserRepository;

class RegisterController extends Controller
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function register(RegisterUserRequest $request)
    {
        $user = $this->userRepository->create($request->all());
        if ($user) {
            $user->sendConfirmationEmail();
        }
    }

    public function verify(VerifyUserRequest $request)
    {
        /** @var \App\User|bool $user */
        $user = $this->userRepository->findWhere([
            'verification_token' => $request->get('token'),
            'email' => $request->get('email'),
            'is_verified' => false
        ])->first();

        if (!$user) {
            return response()->json(['token' => ['Verification is invalid']], 422);
        }

        $user->verify();

        return response()->json(['success' => true]);
    }
}
