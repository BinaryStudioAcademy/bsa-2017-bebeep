<?php

namespace App\Services;

use App\User;
use Illuminate\Support\Collection;
use Illuminate\Notifications\DatabaseNotification;

class NotificationService implements Contracts\NotificationService
{
    /**
     * {@inheritDoc}
     */
    public function getAll(User $user): Collection
    {
        return $user->notifications;
    }

    /**
     * {@inheritDoc}
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
     * {@inheritDoc}
     */
    public function countUnread(User $user): int
    {
        return $user->unreadNotifications->count();
    }
}
