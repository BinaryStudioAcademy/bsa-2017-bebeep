<?php

namespace App\Services\Requests;

interface UpdateUserAvatarRequest
{
    /**
     * @return string
     */
    public function getAvatar(): string;
}
