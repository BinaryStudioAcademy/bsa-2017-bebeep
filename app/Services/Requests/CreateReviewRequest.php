<?php

namespace App\Services\Requests;

interface CreateReviewRequest
{
    public function getTripId() : int;

    public function getRating() : int;

    public function getReview() : ?string;
}
