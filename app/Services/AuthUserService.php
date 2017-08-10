<?php

namespace App\Services;

use App\Exceptions\Auth\CreateTokenException;
use App\Exceptions\Auth\InvalidCredentialsException;
use App\Exceptions\Auth\UserNotFoundException;
use App\Exceptions\Auth\UserNotVerifiedException;
use App\Http\Requests\LoginRequest;
use App\Repositories\UserRepository;
use App\Services\Requests\TokenRequest;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;

class AuthUserService
{
    /**
     * @var UserRepository
     */
    private $userRepository;

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
     * Auth service
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

        if(is_null($user)) {
            throw new UserNotFoundException('user not register', 404);
        }

        if(!$user->isVerified()) {
            throw new UserNotVerifiedException('user not verified', 401);
        }

        try {
            $token = JWTAuth::attempt($credentials);

            if(!$token) {
                throw new InvalidCredentialsException("invalid credentials", 401);
            }

        } catch (JWTException $e) {
            throw new CreateTokenException('could_not_create_token', 500);
        }

        return $token;
    }

    /**
     * Logout service method
     *
     * @param TokenRequest $tokenRequest
     * @param \Tymon\JWTAuth\JWTAuth $JWTAuth
     */
    public function logout(TokenRequest $tokenRequest, \Tymon\JWTAuth\JWTAuth $JWTAuth)
    {
        $token = $tokenRequest->getToken();

        $JWTAuth->setToken($token)->invalidate();
    }
}