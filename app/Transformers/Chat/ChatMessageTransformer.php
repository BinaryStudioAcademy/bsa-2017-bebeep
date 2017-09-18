<?php

namespace App\Transformers\Chat;

use App\Models\ChatMessage;
use League\Fractal\TransformerAbstract;

class ChatMessageTransformer extends TransformerAbstract
{
    protected $availableIncludes = [
        'recipient',
        'sender',
    ];

    public function transform(ChatMessage $chatMessage)
    {
        return [
            'id' => $chatMessage->id,
            'message' => $chatMessage->message,
            'recipient_id' => $chatMessage->recipient_id,
            'sender_id' => $chatMessage->sender_id,
            'is_read' => $chatMessage->is_read,
            'created_at' => $chatMessage->created_at,
            'created_at_x' => $chatMessage->created_at->timestamp,
        ];
    }

    public function includeRecipient(ChatMessage $chatMessage)
    {
        return $this->item($chatMessage->recipient, new UserTransformer());
    }

    public function includeSender(ChatMessage $chatMessage)
    {
        return $this->item($chatMessage->sender, new UserTransformer());
    }
}
