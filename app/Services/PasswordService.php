<?php

namespace App\Services;

use App\Exceptions\User\VerifyException;
use App\Repositories\UserRepository;
use App\Services\Contracts\PasswordService as PasswordServiceContract;
use App\Services\Requests\ForgotPasswordRequest;
use App\Services\Requests\ResetPasswordRequest;
use Illuminate\Support\Facades\Password;

class PasswordService implements PasswordServiceContract
{

    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function forgot(ForgotPasswordRequest $request)
    {
        /** @var \App\User $user */
        $user = $this->userRepository->findByField('email', $request->getEmail())->first();

        if (!$user->isVerified()) {
            throw new VerifyException("Please, verify your account");
        }

        $token = $this->broker()->createToken($user);

        $user->sendPasswordResetNotification($token);
    }

    public function reset(ResetPasswordRequest $request)
    {
        // TODO: Implement reset() method.
    }

    /**
     * @return \Illuminate\Auth\Passwords\PasswordBroker
     */
    protected function broker()
    {
        return Password::broker();
    }
}