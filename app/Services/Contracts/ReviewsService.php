<?php

namespace App\Services\Contracts;

use App\User;
use Illuminate\Support\Collection;

interface ReviewsService
{
    public function getGiven(User $user);
    public function getReceived(User $user);
}