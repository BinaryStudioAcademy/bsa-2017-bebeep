<?php

namespace App\Services;

use App\User;
use App\Services\Requests\{
    UpdateUserAvatarRequest,
    UpdateUserProfileRequest
};
use App\Repositories\UserRepository;
use App\Presenters\UserProfilePresenter;
use App\Services\Contracts\UserProfileService as UserProfileServiceContract;

class UserProfileService implements UserProfileServiceContract
{
    const AVATAR_MEDIA_NAME = 'avatar';

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
     * @inheritdoc
     */
    public function getGeneral(int $userId): array
    {
        return $this->userRepository
            ->setPresenter(UserProfilePresenter::class)
            ->find($userId);
    }

    /**
     * @inheritdoc
     */
    public function updateGeneral(int $userId, UpdateUserProfileRequest $request): array
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

        $this->userRepository->update($attributes, $userId);

        return $this->getGeneral($userId);
    }

    /**
     * @inheritdoc
     */
    public function updateAvatar(int $userId, UpdateUserAvatarRequest $request): string
    {
        $user = $this->userRepository->find($userId);

        $fileName = str_random(20);
        $mediaCollectionName = 'images';

        return $user
           ->addMediaFromBase64($request->getAvatar(), 'image/*')
           ->usingName(self::AVATAR_MEDIA_NAME)
           ->usingFileName($fileName)
           ->toMediaCollection($mediaCollectionName)
           ->getFullUrl();
    }
}
