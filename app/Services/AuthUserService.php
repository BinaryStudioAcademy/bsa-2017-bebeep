<?php

namespace App\Services;

use JWTAuth;
use App\User;
use App\Http\Requests\LoginRequest;
use App\Repositories\UserRepository;
use App\Services\Requests\TokenRequest;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Exceptions\Auth\CreateTokenException;
use App\Exceptions\Auth\UserNotFoundException;
use App\Exceptions\Auth\UserNotVerifiedException;
use App\Exceptions\Auth\InvalidCredentialsException;

class AuthUserService
{
    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * @var array
     */
    private $customClaims = [];

    /**
     * AuthUserService constructor.
     *
     * @param UserRepository $userRepository
     */
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Auth service.
     *
     * @param LoginRequest $request
     * @return mixed
     * @throws CreateTokenException
     * @throws InvalidCredentialsException
     * @throws UserNotFoundException
     * @throws UserNotVerifiedException
     */
    public function auth(LoginRequest $request)
    {
        $credentials = [
            'email' => $request->getEmail(),
            'password' => $request->getPassword(),
        ];

        $user = $this->userRepository->getUserByEmail($request->getEmail());

        if (is_null($user)) {
            throw new UserNotFoundException('User not register');
        }

        if (! $user->isVerified()) {
            throw new UserNotVerifiedException('User not verified');
        }

        $this->setCustomClaims($user);

        try {
            $token = JWTAuth::attempt($credentials, $this->getCustomClaims());

            if (! $token) {
                throw new InvalidCredentialsException('Invalid credentials');
            }
        } catch (JWTException $e) {
            throw new CreateTokenException('Could not create token');
        }

        return $token;
    }

    /**
     * Logout service method.
     *
     * @param TokenRequest $tokenRequest
     * @param \Tymon\JWTAuth\JWTAuth $JWTAuth
     */
    public function logout(TokenRequest $tokenRequest, \Tymon\JWTAuth\JWTAuth $JWTAuth)
    {
        $token = $tokenRequest->getToken();

        $JWTAuth->setToken($token)->invalidate();
    }

    /**
     * Get custom claims for JWT Token payload data.
     *
     * @return array
     */
    private function getCustomClaims(): array
    {
        return $this->customClaims;
    }

    /**
     * Set custom claims for JWT Token payload data.
     *
     * @param \App\User $user
     *
     * @return $this
     */
    private function setCustomClaims(User $user): self
    {
        $this->customClaims = [
            'username' => $user->getFullName(),
        ];

        return $this;
    }
}
