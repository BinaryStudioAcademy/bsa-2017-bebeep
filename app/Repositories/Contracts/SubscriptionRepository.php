<?php

namespace App\Repositories\Contracts;

use App\User;
use App\Models\Subscription;
use Prettus\Repository\Contracts\RepositoryInterface;
use Prettus\Repository\Contracts\RepositoryCriteriaInterface;

interface SubscriptionRepository extends RepositoryInterface, RepositoryCriteriaInterface
{
    /**
     * @param Subscription $subscription
     * @return Subscription
     */
    public function save(Subscription $subscription) : Subscription;

    /**
     * Check if email exists.
     *
     * @param string $email
     * @return bool
     */
    public function isEmailExists(string $email) : bool;

    /**
     * This method update user id by email.
     *
     * @param string $email
     * @param User $user
     * @return bool|null
     */
    public function updateUserIdByEmail(string $email, User $user) : ?bool;
}
