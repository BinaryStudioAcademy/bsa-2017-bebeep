<?php

namespace App\Repositories;

use App\User;
use App\Models\Filter;
use App\Models\Subscription;
use Prettus\Repository\Eloquent\BaseRepository;

class SubscriptionRepository extends BaseRepository implements Contracts\SubscriptionRepository
{
    /**
     * @return string
     */
    public function model()
    {
        return Subscription::class;
    }

    /**
     * {@inheritdoc}
     */
    public function save(Subscription $subscription) : Subscription
    {
        $subscription->push();

        return $subscription;
    }

    /**
     * {@inheritdoc}
     */
    public function setFilters(Subscription $subscription, Filter ...$filters) : Subscription
    {
        $subscription->filters()->saveMany($filters);

        return $subscription;
    }

    /**
     * Check if email exists.
     *
     * @param string $email
     * @return bool
     */
    public function isEmailExists(string $email) : bool
    {
        return $this->model->where('email', $email)->exists();
    }

    /**
     * This method update user id by email.
     *
     * @param string $email
     * @param User $user
     * @return bool|null
     */
    public function updateUserIdByEmail(string $email, User $user) : ?bool
    {
        return $this->model->where('email', $email)->update(['user_id' => $user->getUserId()]);
    }
}
