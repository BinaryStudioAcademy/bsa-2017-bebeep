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
    public function getAvatar(int $userId): ?string
    {
        return $this->userRepository
            ->find($userId)
            ->getAvatarUrl();
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
        $mimeTypes = 'image/*';

        return $user
            ->deleteAvatar()
            ->addMediaFromBase64($request->getAvatar(), $mimeTypes)
            ->usingName($fileName)
            ->usingFileName($fileName)
            ->toMediaCollection(User::MEDIA_AVATARS_COLLECTION)
            ->getUrl();
    }

    /**
     * @inheritdoc
     */
    public function deleteAvatar(int $userId): void
    {
        $user = $this->userRepository->find($userId);
        $user->deleteAvatar();
    }
}
