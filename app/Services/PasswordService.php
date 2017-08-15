<?php

namespace App\Services;

use Mail;
use Illuminate\Support\Str;
use App\Mail\PasswordResetEmail;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Password;
use App\Exceptions\{
    User\VerifyException,
    User\PasswordResetException
};
use App\Services\Requests\{
    ResetPasswordRequest,
    ForgotPasswordRequest,
    UpdatePasswordRequest
};
use App\Services\Contracts\PasswordService as PasswordServiceContract;

class PasswordService implements PasswordServiceContract
{
    /**
     * @var \App\Repositories\UserRepository
     */
    protected $userRepository;

    /**
     * @param \App\Repositories\UserRepository $userRepository
     */
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @inheritdoc
     * @throws \App\Exceptions\User\VerifyException
     */
    public function forgot(ForgotPasswordRequest $request): void
    {
        $user = $this->userRepository->findByField('email', $request->getEmail())->first();

        if (!$user->isVerified()) {
            throw new VerifyException('Please, verify your account');
        }

        $token = $this->broker()->createToken($user);

        Mail::to($user)->send(new PasswordResetEmail($token));
    }

    /**
     * @inheritdoc
     * @throws \App\Exceptions\User\PasswordResetException
     */
    public function reset(ResetPasswordRequest $request): void
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
                    throw new PasswordResetException(
                        'Password is invalid',
                        PasswordResetException::INVALID_PASSWORD
                    );
                    break;
                case Password::INVALID_TOKEN:
                    throw new PasswordResetException(
                        'Token is invalid',
                        PasswordResetException::INVALID_TOKEN
                    );
                    break;
                case Password::INVALID_USER:
                    throw new PasswordResetException(
                        'Email is invalid',
                        PasswordResetException::INVALID_USER
                    );
                    break;
            }
        }
    }

    /**
     * Get the password broker.
     *
     * @return \Illuminate\Auth\Passwords\PasswordBroker
     */
    protected function broker()
    {
        return Password::broker();
    }
}
