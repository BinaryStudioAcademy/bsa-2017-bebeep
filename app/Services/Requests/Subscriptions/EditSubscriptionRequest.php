<?php

namespace App\Services\Requests\Subscriptions;

interface EditSubscriptionRequest
{
    /**
     * @return array
     */
    public function getFilters(): array;
}
