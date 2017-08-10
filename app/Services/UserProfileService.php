<?php

namespace App\Services;

use App\Repositories\UserRepository;
use App\User;

class UserProfileService
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getGeneralData()
    {
        $id = 1; // Auth::user()->id
        return $this->userRepository->find($id);
    }

    /**
     * @param RegisterUserRequest $request
     * @return User
     */
    /*
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
    */

    /**
     * @param VerifyUserRequest $request
     * @return string
     * @throws VerifyException
     */
    /*
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
    */
}
