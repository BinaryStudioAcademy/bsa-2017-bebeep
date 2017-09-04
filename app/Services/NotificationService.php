<?php

namespace App\Services;

use App\User;
use Illuminate\Support\Collection;
use Illuminate\Notifications\DatabaseNotification;

class NotificationService implements Contracts\NotificationService
{
    /**
     * {@inheritdoc}
     */
    public function getAll(User $user): Collection
    {
        return $user->notifications;
    }

    /**
     * {@inheritdoc}
     */
    public function markAsRead(User $user, DatabaseNotification $databaseNotification): bool
    {
        /** @var DatabaseNotification $notification */
        $notification = $user->notifications()->whereId($databaseNotification->id)->first();

        if ($notification) {
            $notification->markAsRead();

            return true;
        }

        return false;
    }

    /**
     * {@inheritdoc}
     */
    public function countUnread(User $user): int
    {
        return $user->unreadNotifications->count();
    }
}
