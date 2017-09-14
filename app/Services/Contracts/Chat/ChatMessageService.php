<?php

namespace App\Services\Contracts\Chat;

use App\User;
use App\Models\ChatMessage;
use Illuminate\Support\Collection;
use App\Services\Requests\Chat\MessageRequest;

interface ChatMessageService
{
    /**
     * @param User $user
     * @return Collection
     */
    public function getUserMessages(User $recipient, User $sender) : Collection;

    /**
     * @param User $sender
     * @param User $recipient
     * @param string $message
     * @return ChatMessageService
     */
    public function addMessage(MessageRequest $messageRequest, User $sender, User $recipient) : ChatMessage;
}
