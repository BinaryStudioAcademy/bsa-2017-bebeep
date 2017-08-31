<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Services\Contracts\ReviewsService;

class ReviewsController extends Controller
{
    protected $reviewsService;

    public function __construct(ReviewsService $reviewsService)
    {
        $this->reviewsService = $reviewsService;
    }

    public function given(Request $request, User $user)
    {
        $reviews = $this->reviewsService->getGiven($user);
        return response()->json($reviews->toArray());
    }

    public function received(Request $request, User $user)
    {
        $reviews = $this->reviewsService->getReceived($user);
        return response()->json($reviews->toArray());
    }
}
