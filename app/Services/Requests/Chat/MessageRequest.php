<?php

namespace App\Services\Requests\Chat;

interface MessageRequest
{
    /**
     * Get message.
     *
     * @return string
     */
    public function getMessage() : string;

    /**
     * Get is read status.
     *
     * @return bool|null
     */
    public function getIsRead() : ?bool;
}
