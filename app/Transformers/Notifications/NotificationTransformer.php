<?php

namespace App\Transformers\Notifications;

use League\Fractal\TransformerAbstract;
use Illuminate\Notifications\DatabaseNotification;

class NotificationTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(DatabaseNotification $notification)
    {
        return [
            'id' => $notification->id,
            'read' => $notification->read(),
            'data' => $notification->data,
            'type' => snake_case(class_basename($notification->type)),
            'created_at' => $notification->created_at,
            'created_at_x' => $notification->created_at->timestamp,
        ];
    }
}
