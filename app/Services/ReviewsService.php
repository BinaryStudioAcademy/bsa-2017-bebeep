<?php

namespace App\Services;

use App\User;
use App\Models\Review;
use App\Events\ReviewOnTripCreated;
use App\Repositories\ReviewRepository;
use App\Repositories\BookingRepository;
use App\Criteria\Review\GivenReviewCriteria;
use App\Criteria\Review\RatingReviewCriteria;
use App\Services\Requests\CreateReviewRequest;
use App\Criteria\Review\ReceivedReviewCriteria;

class ReviewsService implements Contracts\ReviewsService
{
    /**
     * @var ReviewRepository
     */
    protected $reviewRepository;

    /**
     * @var BookingRepository
     */
    protected $bookingRepository;

    /**
     * ReviewsService constructor.
     *
     * @param ReviewRepository $reviewRepository
     * @param BookingRepository $bookingRepository
     */
    public function __construct(ReviewRepository $reviewRepository, BookingRepository $bookingRepository)
    {
        $this->reviewRepository = $reviewRepository;
        $this->bookingRepository = $bookingRepository;
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
     * This method save review.
     *
     * @param CreateReviewRequest $request
     * @param User $user
     * @return Review
     */
    public function save(CreateReviewRequest $request, User $user)
    {
        $booking = $this->bookingRepository->getBookingByTripId($request->getTripId());

        $reviewAttributes = [
            'mark' => $request->getRating(),
            'comment' => $request->getReview(),
            'user_id' => $user->id,
            'driver_id' => $booking->trip->user_id,
        ];

        $review = $this->reviewRepository->save(new Review($reviewAttributes));

        event(new ReviewOnTripCreated($review, $booking->trip));

        return $review;
    }
}
