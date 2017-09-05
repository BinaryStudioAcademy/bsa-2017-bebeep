<?php

namespace App\Services\Contracts;

use App\User;
use InvalidArgumentException;
use Illuminate\Support\Collection;
use Illuminate\Notifications\DatabaseNotification;
use App\Services\Requests\Notifications\StatusRequest;
use App\Exceptions\Notifications\NotBelongUserException;

interface NotificationService
{
    /**
     * @param User $user
     * @return Collection
     */
    public function getAll(User $user) : Collection;

    /**
     * @param StatusRequest $status
     * @param User $user
     * @param DatabaseNotification $databaseNotification
     * @return bool
     * @throws InvalidArgumentException
     * @throws NotBelongUserException
     */
    public function changeStatus(StatusRequest $status, User $user, DatabaseNotification $databaseNotification);

    /**
     * @param User $user
     * @return int
     */
    public function countUnread(User $user) : int;
}
