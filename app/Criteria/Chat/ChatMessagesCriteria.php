<?php

namespace App\Criteria\Chat;

use App\User;
use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

class ChatMessagesCriteria implements CriteriaInterface
{
    /**
     * @var User
     */
    private $sender;
    /**
     * @var User
     */
    private $recipient;

    public function __construct(User $recipient, User $sender)
    {
        $this->sender = $sender;
        $this->recipient = $recipient;
    }

    /**
     * Apply criteria in query repository.
     *
     * @param                     $model
     * @param RepositoryInterface $repository
     *
     * @return mixed
     */
    public function apply($model, RepositoryInterface $repository)
    {
        return $model
            ->where(function ($query) {
                return $query->where('recipient_id', $this->recipient->id)
                    ->where('sender_id', $this->sender->id);
            })
            ->orWhere(function ($query) {
                return $query->where('recipient_id', $this->sender->id)
                    ->where('sender_id', $this->recipient->id);
            })
            ->latest('created_at');
    }
}
