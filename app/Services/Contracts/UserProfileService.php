<?php

namespace App\Services\Contracts;

use App\User;
use App\Services\Requests\UpdateUserAvatarRequest;
use App\Services\Requests\UpdateUserProfileRequest;

interface UserProfileService
{
    /**
     * Get the user profile general data.
     *
     * @param int $userId
     *
     * @return \App\User
     */
    public function getGeneral(int $userId): User;

    /**
     * Update the user profile general data.
     *
     * @param int $userId
     * @param \App\Services\Requests\UpdateUserProfileRequest $request
     *
     * @return \App\User
     */
    public function updateGeneral(int $userId, UpdateUserProfileRequest $request): User;

    /**
     * Update the user profile avatar.
     *
     * @param int $userId
     * @param \App\Services\Requests\UpdateUserAvatarRequest $request
     *
     * @return string The avatar image full url
     */
    public function updateAvatar(int $userId, UpdateUserAvatarRequest $request): string;

    /**
     * Delete the user profile avatar.
     *
     * @param int $userId
     *
     * @return void
     */
    public function deleteAvatar(int $userId): void;
}
