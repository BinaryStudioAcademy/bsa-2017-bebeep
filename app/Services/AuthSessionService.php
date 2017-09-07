<?php

namespace App\Services;

use JWTAuth;
use App\Exceptions\Auth\UserNotFoundException;

class AuthSessionService
{
    /**
     * Get the session user data.
     *
     * @return mixed
     *
     * @throws UserNotFoundException
     */
    public function getUserData()
    {
        $user = JWTAuth::parseToken()->authenticate();

        if (is_null($user)) {
            throw new UserNotFoundException(__('Services/AuthUserService.user_not_register'));
        }

        return $user;
    }
}
