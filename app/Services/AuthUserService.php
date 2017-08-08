<?php

namespace App\Services;

use App\Exceptions\Auth\CreateTokenException;
use App\Exceptions\Auth\InvalidCredentialsException;
use App\Exceptions\Auth\UserNotFoundException;
use App\Http\Requests\LoginRequest;
use App\User;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;

class AuthUserService
{
    /**
     * Auth service
     *
     * @param LoginRequest $request
     * @return mixed
     * @throws CreateTokenException
     * @throws InvalidCredentialsException
     * @throws UserNotFoundException
     */
    public function auth(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');
        $user = User::where('email', $request->email)->first();

        if(is_null($user)) {
            throw new UserNotFoundException('user not register');
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
}