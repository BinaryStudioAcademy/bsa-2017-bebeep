<?php

namespace App\Services;

use App\User;
use App\Events\UserRegistered;
use App\Repositories\UserRepository;
use App\Exceptions\User\VerifyException;
use App\Services\Requests\VerifyUserRequest;
use App\Criteria\User\NotVerifiedUserCriteria;
use App\Services\Requests\RegisterUserRequest;

class RegisterUserService
{
    /**
     * @var \App\Repositories\UserRepository
     */
    private $userRepository;

    /**
     * @var SubscriptionsService
     */
    private $subscriptionsService;

    /**
     * @var array
     */
    private $customClaims = [];

    /**
     * RegisterUserService constructor.
     *
     * @param UserRepository $userRepository
     * @param SubscriptionsService $subscriptionsService
     */
    public function __construct(UserRepository $userRepository, SubscriptionsService $subscriptionsService)
    {
        $this->userRepository = $userRepository;
        $this->subscriptionsService = $subscriptionsService;
    }

    /**
     * @param RegisterUserRequest $request
     *
     * @return string
     */
    public function register(RegisterUserRequest $request): string
    {
        $attributes = [
            'email' => $request->getEmail(),
            'first_name' => $request->getFirstName(),
            'last_name' => $request->getLastName(),
            'password' => bcrypt($request->getPass()),
            'phone' => $request->getPhone(),
            'birth_date' => $request->getBirthDate(),
            'permissions' => $request->getPermissions(),
        ];

        $user = $this->userRepository->save(new User($attributes));

        $this->subscriptionsService->updateUserIdAfterRegister($request->getEmail(), $user);

        event(new UserRegistered($user));

        $this->setCustomClaims($user);

        return \JWTAuth::fromUser($user, $this->getCustomClaims());
    }

    /**
     * @param \App\Services\Requests\VerifyUserRequest $request
     *
     * @return string
     *
     * @throws \App\Exceptions\User\VerifyException
     */
    public function verify(VerifyUserRequest $request): string
    {
        $this->userRepository->pushCriteria(new NotVerifiedUserCriteria(
            $request->getEmail(),
            $request->getToken()
        ));

        $user = $this->userRepository->first();

        if (! $user) {
            throw new VerifyException(__('Services/RegisterUserService.user_cant_verified'));
        }

        $user->is_verified = true;
        $user->verification_token = null;

        $user = $this->userRepository->save($user);

        return \JWTAuth::fromUser($user);
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
     * @param User $user
     *
     * @return RegisterUserService
     */
    private function setCustomClaims(User $user): self
    {
        $this->customClaims = [
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'email' => $user->email,
            'avatar' => $user->getAvatarUrl(),
        ];

        return $this;
    }
}
