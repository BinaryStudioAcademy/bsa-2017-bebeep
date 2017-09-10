<?php

namespace App\Services\Contracts;

use App\Models\Trip;
use Illuminate\Support\Collection;
use App\Services\Requests\CreateSubscriptionsRequest;

interface SubscriptionsService
{
    /**
     * @param Trip $trip
     * @return Collection
     */
    public function getSubscriptionsByTrip(Trip $trip) : Collection;

    /**
     * @param CreateSubscriptionsRequest $request
     *
     * @return mixed
     */
    public function create(CreateSubscriptionsRequest $request);
}
