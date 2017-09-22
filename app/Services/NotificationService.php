<?php

namespace App\Services;

use App\User;
use App\Models\Subscription;
use InvalidArgumentException;
use Illuminate\Support\Collection;
use Illuminate\Notifications\DatabaseNotification;
use App\Services\Requests\Notifications\StatusRequest;
use App\Exceptions\Notifications\NotBelongUserException;

class NotificationService implements Contracts\NotificationService
{
    /**
     * {@inheritdoc}
     */
    public function getAll(User $user): Collection
    {
        return collect($user->notifications)
            ->concat($user->subscriptions->reduce(function (Collection $notifications, Subscription $subscription) {
                return $notifications->concat($subscription->notifications);
            }, collect([])))
            ->sort(function ($a, $b) {
                return $b->created_at->timestamp <=> $a->created_at->timestamp;
            });
    }

    /**
     * {@inheritdoc}
     */
    public function changeStatus(StatusRequest $status, User $user, DatabaseNotification $databaseNotification)
    {
        /** @var DatabaseNotification $notification */
        $notification = $this->getAll($user)->where('id', $databaseNotification->id)->first();

        if ($notification) {
            if ($status->isRead()) {
                $notification->markAsRead();
            } else {
                throw new InvalidArgumentException('Invalid status value');
            }
        } else {
            throw new NotBelongUserException('Notification is not belong to user');
        }
    }

    /**
     * {@inheritdoc}
     */
    public function countUnread(User $user): int
    {
        return $user->unreadNotifications->count();
    }
}
