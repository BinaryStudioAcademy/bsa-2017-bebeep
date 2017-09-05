<?php

namespace App\Services\Contracts;

use App\Services\Requests\CreateSubscriptionsRequest;

interface SubscriptionsService
{
    /**
     * @param CreateSubscriptionsRequest $request
     *
     * @return mixed
     */
    public function create(CreateSubscriptionsRequest $request);
}