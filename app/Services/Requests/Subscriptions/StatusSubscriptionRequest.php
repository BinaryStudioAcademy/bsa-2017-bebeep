<?php

namespace App\Services\Requests\Subscriptions;

interface StatusSubscriptionRequest
{
    public function isActive() : bool;
}
