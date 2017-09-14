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

    public function save(ChatMessage $chatMessage): ChatMessage
    {
        $chatMessage->save();

        return $chatMessage;
    }
}
