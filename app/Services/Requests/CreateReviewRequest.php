<?php

namespace App\Services\Requests;

interface CreateReviewRequest
{
    public function getTripId() : int;

    public function getRating() : float;

    public function getReview() : ?string;
}
