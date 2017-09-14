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
     * @param ChatMessage $chatMessage
     * @return ChatMessage
     */
    public function deleteUserMessage(ChatMessage $chatMessage)
    {
        $chatMessage->delete();

        return $chatMessage;
    }
}
