<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class ChatMessage extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        'id',
        'message',
        'is_read',
        'sender_id',
        'recipient_id',
    ];

    /**
     * @var array
     */
    protected $casts = [
        'is_read' => 'boolean',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function sender()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function recipient()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get message id.
     *
     * @return int
     */
    public function getMessageId() : int
    {
        return (int) ($this->attributes['id']);
    }
}
