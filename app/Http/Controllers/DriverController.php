<?php

namespace App\Http\Controllers;

use App\User;
use App\Services\ReviewsService;
use App\Transformers\Reviews\ReviewTransformer;

class DriverController extends Controller
{
    private $reviewsService;

    public function __construct(ReviewsService $reviewsService)
    {
        $this->reviewsService = $reviewsService;
    }

    /**
     * @param User $user
     * @return $this
     */
    public function getReviews(User $user)
    {
        $reviews = $this->reviewsService->getReceived($user);

        return fractal()->collection($reviews, new ReviewTransformer())->parseIncludes(['user']);
    }

    /**
     * @param User $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function getReviewsMetaData(User $user)
    {
        $meta = $this->reviewsService->getRating($user);

        return response()->json($meta);
    }
}
