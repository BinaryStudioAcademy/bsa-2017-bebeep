<?php

namespace App\Services;

use App\User;
use App\Repositories\UserRepository;
use App\Services\Requests\UpdateUserAvatarRequest;
use App\Services\Requests\UpdateUserProfileRequest;
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
     * {@inheritdoc}
     */
    public function getGeneral(User $user): User
    {
        return $user;
    }

    /**
     * {@inheritdoc}
     */
    public function getAvatar(User $user): ?string
    {
        return $user->getAvatarUrl();
    }

    /**
     * {@inheritdoc}
     */
    public function updateGeneral(User $user, UpdateUserProfileRequest $request): User
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

        return $this->userRepository->updateUser(new User($attributes), $user->id);
    }

    /**
     * {@inheritdoc}
     */
    public function updateAvatar(User $user, UpdateUserAvatarRequest $request): string
    {
        $fileName = str_random(20);

        $user->deleteAvatar()
            ->addMediaFromBase64(
                $request->getAvatar(),
                User::MEDIA_AVATAR_ALLOWED_MIMETYPES
            )
            ->usingName($fileName)
            ->usingFileName($fileName)
            ->toMediaCollection(User::MEDIA_AVATARS_COLLECTION);

        return $user->getAvatarUrl();
    }

    /**
     * {@inheritdoc}
     */
    public function deleteAvatar(User $user): void
    {
        $user->deleteAvatar();
    }
}
