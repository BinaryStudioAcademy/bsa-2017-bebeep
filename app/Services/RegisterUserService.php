<?php

namespace App\Services;

use App\User;
use App\Events\UserRegistered;
use App\Repositories\UserRepository;
use App\Exceptions\User\VerifyException;
use App\Criteria\User\NotVerifiedUserCriteria;
use App\Services\Requests\{RegisterUserRequest, VerifyUserRequest};

class RegisterUserService
{
    /**
     * @var \App\Repositories\UserRepository
     */
    private $userRepository;

    /**
     * @param \App\Repositories\UserRepository $userRepository
     */
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @param \App\Services\Requests\RegisterUserRequest $request
     *
     * @return \App\User
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
     * @param \App\Services\Requests\VerifyUserRequest $request
     *
     * @return string
     * @throws \App\Exceptions\User\VerifyException
     */
    public function verify(VerifyUserRequest $request) : string
    {
        $this->userRepository->pushCriteria(new NotVerifiedUserCriteria(
            $request->getEmail(),
            $request->getToken()
        ));

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
