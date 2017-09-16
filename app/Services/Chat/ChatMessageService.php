<?php

namespace App\Services\Chat;

use App\User;
use App\Models\ChatMessage;
use Illuminate\Support\Collection;
use App\Criteria\Chat\ChatMessagesCriteria;
use App\Services\Requests\Chat\MessageRequest;
use App\Repositories\Contracts\ChatMessageRepository;
use App\Exceptions\Messages\MessageNotBelongToUserException;
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
    public function getUserMessages(User $recipient, User $sender): Collection
    {
        return $this->chatMessageRepository->getByCriteria(new ChatMessagesCriteria($recipient, $sender));
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

    /**
     * Delete user message.
     *
     * @param User $user
     * @param ChatMessage $message
     * @return mixed
     * @throws MessageNotBelongToUserException
     */
    public function deleteUserMessage(User $user, ChatMessage $message)
    {
        if ($message->getSenderId() != $user->getUserId() && $message->getRecipientId() != $user->getUserId()) {
            throw new MessageNotBelongToUserException("This message doesn't belong to current user");
        }

        return $this->chatMessageRepository->deleteUserMessage($message);
    }

    /**
     * Mark message as read.
     *
     * @param User $user
     * @param ChatMessage $message
     * @return mixed
     * @throws MessageNotBelongToUserException
     */
    public function markAsRead(User $user, ChatMessage $message)
    {
        $attributes = [
            'is_read' => true,
        ];

        if ($message->getRecipientId() != $user->getUserId()) {
            throw new MessageNotBelongToUserException("This message doesn't belong to current user");
        }

        return $this->chatMessageRepository->markMessageAsRead(new ChatMessage($attributes), $message->getMessageId());
    }
}
