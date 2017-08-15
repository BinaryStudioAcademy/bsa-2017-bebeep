<?php

namespace App\Services;

use App\User;
use App\Repositories\UserRepository;
use App\Presenters\UserProfilePresenter;
use App\Services\Requests\UpdateUserProfileRequest;

class UserProfileService
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
     * Get the user profile general data.
     *
     * @return array
     */
    public function getGeneral(int $userId): array
    {
        return $this->userRepository
            ->setPresenter(UserProfilePresenter::class)
            ->find($userId);
    }

    /**
     * Update the user profile general data.
     *
     * @param int $userId
     *
     * @return array
     */
    public function updateGeneral(int $userId, UpdateUserProfileRequest $request)
    {
        $attributes = [
            'email' => $request->getEmail(),
            'first_name' => $request->getFirstName(),
            'last_name' => $request->getLastName(),
            'phone' => $request->getPhone(),
            'birth_date' => $request->getBirthDate(),
            'about_me' => $request->getAboutMe(),
            'permissions' => $request->getPermissions(),
        ];

        //return $attributes;

        $this->userRepository->update($attributes, $userId);

        return $this->getGeneral($userId);
    }
}
