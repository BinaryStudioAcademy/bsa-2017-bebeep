<?php

namespace App\Services\Requests;

interface UpdateUserAvatarRequest
{
    public function getAvatar(): string;
}
