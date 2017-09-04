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
     * @param \App\User $user
     *
     * @return \App\User
     */
    public function getGeneral(User $user): User;

    /**
     * Get the user profile avatar.
     *
     * @param \App\User $user
     *
     * @return string|null
     */
    public function getAvatar(User $user): ?string;

    /**
     * Update the user profile general data.
     *
     * @param \App\User $user
     * @param \App\Services\Requests\UpdateUserProfileRequest $request
     *
     * @return \App\User
     */
    public function updateGeneral(User $user, UpdateUserProfileRequest $request): User;

    /**
     * Update the user profile avatar.
     *
     * @param \App\User $user
     * @param \App\Services\Requests\UpdateUserAvatarRequest $request
     *
     * @return string The avatar image full url
     */
    public function updateAvatar(User $user, UpdateUserAvatarRequest $request): string;

    /**
     * Delete the user profile avatar.
     *
     * @param \App\User $user
     *
     * @return void
     */
    public function deleteAvatar(User $user): void;
}
