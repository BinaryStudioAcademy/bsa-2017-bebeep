<?php

namespace App\Services\Requests;

use Carbon\Carbon;

interface CreateSubscriptionsRequest
{
    public function getFrom(): array;

    public function getTo(): array;

    public function getFilters(): array;

    public function getStartAt(): Carbon;

    public function getEmail(): string ;
}