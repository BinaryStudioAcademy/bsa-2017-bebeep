<?php

namespace App\Services\Chat;

use App\User;
use App\Models\ChatMessage;
use Illuminate\Support\Collection;
use App\Services\Requests\Chat\MessageRequest;
use App\Repositories\Contracts\ChatMessageRepository;
use App\Services\Contracts\Chat\ChatMessageService as ChatMessageServiceContract;

class ChatMessageService implements ChatMessageServiceContract
{
    /**
     * @var ChatMessageRepository
     */
    private $chatMessageRepository;

    public function __construct(ChatMessageRepository $chatMessageRepository)
    {
        $this->chatMessageRepository = $chatMessageRepository;
    }

    /**
     * {@inheritdoc}
     */
    public function getUserMessages(User $user): Collection
    {
        /**
         * @var Collection $messages
         */
        $received = $user->receivedMessages;

        return $received->union($user->sentMessages);
    }

    /**
     * {@inheritdoc}
     */
    public function addMessage(MessageRequest $messageRequest, User $sender, User $recipient): ChatMessage
    {
        $chatMessage = new ChatMessage();

        $chatMessage->message = $messageRequest->getMessage();
        $chatMessage->sender_id = $sender->id;
        $chatMessage->recipient_id = $recipient->id;

        return $this->chatMessageRepository->save($chatMessage);
    }
}
