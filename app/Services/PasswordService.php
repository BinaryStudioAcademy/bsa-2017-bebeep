<?php

namespace App\Services;

use App\Exceptions\User\PasswordResetException;
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
        $response = $this->broker()->reset(
            [
                'email' => $request->getEmail(),
                'token' => $request->getToken(),
                'password' => $request->getPass(),
                'password_confirmation' => $request->getPasswordConfirmation(),
            ],
            function ($user, $password) {
                $this->userRepository->changePassword($user, $password);
            }
        );
        if ($response !== Password::PASSWORD_RESET) {
            switch($response) {
                case Password::INVALID_PASSWORD:
                    throw new PasswordResetException("Invalid password", PasswordResetException::INVALID_PASSWORD);
                    break;
                case Password::INVALID_TOKEN:
                    throw new PasswordResetException("Invalid token", PasswordResetException::INVALID_TOKEN);
                    break;
                case Password::INVALID_USER:
                    throw new PasswordResetException("Invalid user", PasswordResetException::INVALID_USER);
                    break;
            }
        }
    }

    /**
     * @return \Illuminate\Auth\Passwords\PasswordBroker
     */
    protected function broker()
    {
        return Password::broker();
    }
}