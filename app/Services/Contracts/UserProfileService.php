<?php

namespace App\Services\Contracts;

use App\Services\Requests\UpdateUserProfileRequest;

interface UserProfileService
{
    /**
     * Get the user profile general data.
     *
     * @return array
     */
    public function getGeneral(int $userId): array;

    /**
     * Update the user profile general data.
     *
     * @param int $userId
     * @param \App\Services\Requests\UpdateUserProfileRequest $request
     *
     * @return array
     */
    public function updateGeneral(int $userId, UpdateUserProfileRequest $request): array;
}
