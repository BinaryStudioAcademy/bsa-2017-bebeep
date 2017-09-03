<?php

namespace App\Services\Contracts;

use App\User;
use Illuminate\Support\Collection;
use Illuminate\Notifications\DatabaseNotification;

interface NotificationService
{
    /**
     * @param User $user
     * @return Collection
     */
    public function getAll(User $user) : Collection;

    /**
     * @param User $user
     * @param DatabaseNotification $databaseNotification
     * @return bool
     */
    public function markAsRead(User $user, DatabaseNotification $databaseNotification) : bool;

    /**
     * @param User $user
     * @return int
     */
    public function countUnread(User $user) : int;
}
