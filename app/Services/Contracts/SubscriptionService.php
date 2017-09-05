<?php

namespace App\Services\Contracts;

use App\Models\Trip;
use Illuminate\Support\Collection;

interface SubscriptionService
{
    /**
     * @param Trip $trip
     * @return Collection
     */
    public function getSubscriptionsByTrip(Trip $trip) : Collection;
}
