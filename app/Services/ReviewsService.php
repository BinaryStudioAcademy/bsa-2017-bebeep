<?php

namespace App\Services;

use App\User;
use App\Repositories\ReviewRepository;
use App\Criteria\Review\GivenReviewCriteria;
use App\Criteria\Review\ReceivedReviewCriteria;

class ReviewsService implements Contracts\ReviewsService
{
    /** @var ReviewRepository $reviewRepository */
    protected $reviewRepository;

    public function __construct(ReviewRepository $reviewRepository)
    {
        $this->reviewRepository = $reviewRepository;
    }

    public function getGiven(User $user)
    {
        return $this->reviewRepository->getByCriteria(new GivenReviewCriteria($user));
    }

    public function getReceived(User $user)
    {
        return $this->reviewRepository->getByCriteria(new ReceivedReviewCriteria($user));
    }
}
