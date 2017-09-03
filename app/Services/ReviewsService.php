<?php

namespace App\Services;

use App\User;
use App\Models\Trip;
use App\Models\Review;
use App\Repositories\ReviewRepository;
use App\Criteria\Review\GivenReviewCriteria;
use App\Criteria\Review\RatingReviewCriteria;
use App\Criteria\Review\ReceivedReviewCriteria;
use App\Http\Requests\CreateReviewRequest;

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

    public function getRating(User $user)
    {
        return $this->reviewRepository
            ->getByCriteria(new RatingReviewCriteria($user))
            ->reduce(function ($rating, $mark) {
                $rating[$mark['mark'] - 1] = $mark['mark_count'];

                return $rating;
            }, [0, 0, 0, 0, 0]);
    }

    /**
     * This method save review
     *
     * @param CreateReviewRequest $request
     * @param User $user
     * @return Review
     */
    public function save(CreateReviewRequest $request, User $user)
    {
        $trip_id = $request->getTripId();
        $trip = Trip::find($trip_id);
        $driver_id = $trip->user_id;

        $reviewAttributes = [
            'mark' => $request->getRating(),
            'comment' => $request->getReview(),
            'user_id' => $user->id,
            'driver_id' => $driver_id
        ];

        $review = $this->reviewRepository->save(new Review($reviewAttributes));

        return $review;
    }
}
