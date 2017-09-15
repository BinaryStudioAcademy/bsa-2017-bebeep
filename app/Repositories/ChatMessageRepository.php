<?php

namespace App\Repositories;

use App\Models\ChatMessage;
use Prettus\Repository\Eloquent\BaseRepository;

class ChatMessageRepository extends BaseRepository implements Contracts\ChatMessageRepository
{
    /**
     * Specify Model class name.
     *
     * @return string
     */
    public function model()
    {
        return ChatMessage::class;
    }

    /**
     * Save user message
     *
     * @param ChatMessage $chatMessage
     * @return ChatMessage
     */
    public function save(ChatMessage $chatMessage): ChatMessage
    {
        $chatMessage->save();

        return $chatMessage;
    }

    /**
     * Delete user message
     *
     * @param ChatMessage $message
     * @return ChatMessage
     */
    public function deleteUserMessage(ChatMessage $message)
    {
        $message->delete();

        return $message;
    }

    /**
     * Mark message as read
     *
     * @param ChatMessage $message
     * @param int $id
     * @return mixed
     */
    public function markMessageAsRead(ChatMessage $message, int $id)
    {
        return $this->update($message->toArray(), $id);
    }
}
