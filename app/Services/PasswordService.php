<?php

namespace App\Services;

use App\Exceptions\User\PasswordResetException;
use App\Exceptions\User\VerifyException;
use App\Repositories\UserRepository;
use App\Services\Contracts\PasswordService as PasswordServiceContract;
use App\Services\Requests\ForgotPasswordRequest;
use App\Services\Requests\ResetPasswordRequest;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use App\Mail\PasswordResetEmail;
use Mail;

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

        Mail::to($user)->send(new PasswordResetEmail($token));
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
                $user->password = bcrypt($password);
                $user->remember_token = Str::random(60);
                $this->userRepository->save($user);
            }
        );

        if ($response !== Password::PASSWORD_RESET) {
            switch($response) {
                case Password::INVALID_PASSWORD:
                    throw new PasswordResetException("Password is invalid", PasswordResetException::INVALID_PASSWORD);
                    break;
                case Password::INVALID_TOKEN:
                    throw new PasswordResetException("Token is invalid", PasswordResetException::INVALID_TOKEN);
                    break;
                case Password::INVALID_USER:
                    throw new PasswordResetException("Email is invalid", PasswordResetException::INVALID_USER);
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