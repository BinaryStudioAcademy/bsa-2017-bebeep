<?php

namespace App\Repositories;

use App\Models\Review;
use Prettus\Repository\Eloquent\BaseRepository;

class ReviewRepository extends BaseRepository
{
    /**
     * @return string
     */
    public function model()
    {
        return Review::class;
    }

    /**
     * @param Review $review
     * @return Review
     */
    public function save(Review $review): Review
    {
        $review->save();

        return $review;
    }
}
