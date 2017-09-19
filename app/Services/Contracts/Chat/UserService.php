<?php

namespace App\Services\Contracts\Chat;

use App\User;
use Illuminate\Support\Collection;
use App\Services\Requests\Chat\UsersSearchRequest;

interface UserService
{
    /**
     * @return Collection
     */
    public function getOthers(UsersSearchRequest $request, User $user) : Collection;
}
