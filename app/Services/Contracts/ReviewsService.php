<?php

namespace App\Services\Contracts;

use App\User;

interface ReviewsService
{
    public function getGiven(User $user);

    public function getReceived(User $user);

    public function getRating(User $user);
}
