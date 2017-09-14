<?php

namespace App\Repositories\Contracts;

use App\Models\ChatMessage;
use Prettus\Repository\Contracts\RepositoryInterface;
use Prettus\Repository\Contracts\RepositoryCriteriaInterface;

interface ChatMessageRepository extends RepositoryInterface, RepositoryCriteriaInterface
{
    public function save(ChatMessage $chatMessage) : ChatMessage;
}
