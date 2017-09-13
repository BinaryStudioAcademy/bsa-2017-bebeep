<?php

namespace App\Services\Contracts\Chat;

use App\User;
use Illuminate\Support\Collection;

interface UserService
{
    /**
     * @return Collection
     */
    public function getOthers(User $user) : Collection;
}
