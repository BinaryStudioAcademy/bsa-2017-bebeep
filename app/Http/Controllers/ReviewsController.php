<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Services\Contracts\ReviewsService;
use App\Transformers\Reviews\ReviewTransformer;

class ReviewsController extends Controller
{
    protected $reviewsService;

    public function __construct(ReviewsService $reviewsService)
    {
        $this->reviewsService = $reviewsService;
    }

    public function given()
    {
        $user = Auth::user();
        $reviews = $this->reviewsService->getGiven($user);

        return fractal()->collection($reviews, new ReviewTransformer())->parseIncludes(['user']);
    }

    public function received()
    {
        $user = Auth::user();
        $reviews = $this->reviewsService->getReceived($user);
        return fractal()
            ->collection($reviews, new ReviewTransformer())
            ->parseIncludes(['user'])
            ->addMeta([
                'rating' => $this->reviewsService->getRating($user),
            ]);
    }
}
