<?php

namespace App\Services\Requests\Notifications;

interface StatusRequest
{
    /**
     * @return bool
     */
    public function isRead() : bool;
}
