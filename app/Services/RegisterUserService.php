<?php

namespace App\Services;

use App\Criteria\User\NotVerifiedUserCriteria;
use App\Events\UserRegistered;
use App\Exceptions\User\VerifyException;
use App\Services\Requests\RegisterUserRequest;
use App\Repositories\UserRepository;
use App\Services\Requests\VerifyUserRequest;
use App\User;

class RegisterUserService
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @param RegisterUserRequest $request
     * @return User
     */
    public function register(RegisterUserRequest $request): User
    {
        $attributes = [
            'email' => $request->getEmail(),
            'first_name' => $request->getFirstName(),
            'last_name' => $request->getLastName(),
            'password' => bcrypt($request->getPass()),
            'phone' => $request->getPhone(),
            'permissions' => $request->getPermissions(),
        ];

        $user = $this->userRepository->save(new User($attributes));

        event(new UserRegistered($user));

        return $user;
    }

    /**
     * @param VerifyUserRequest $request
     * @return string
     * @throws VerifyException
     */
    public function verify(VerifyUserRequest $request) : string
    {
        $this->userRepository->pushCriteria(new NotVerifiedUserCriteria($request->getEmail(), $request->getToken()));

        $user = $this->userRepository->first();

        if (!$user) {
            throw new VerifyException('User cannot be verified');
        }

        $user->is_verified = true;
        $user->verification_token = null;

        $user = $this->userRepository->save($user);

        return \JWTAuth::fromUser($user);
    }
}