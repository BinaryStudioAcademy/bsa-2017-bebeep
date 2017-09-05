<?php

namespace App\Repositories;

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
}