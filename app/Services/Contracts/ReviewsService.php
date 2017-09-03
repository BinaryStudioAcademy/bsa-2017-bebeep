<?php

namespace App\Services\Contracts;

use App\User;
use App\Http\Requests\CreateReviewRequest;

interface ReviewsService
{
    public function getGiven(User $user);

    public function getReceived(User $user);

    public function getRating(User $user);

    public function save(CreateReviewRequest $request, User $user);
}
