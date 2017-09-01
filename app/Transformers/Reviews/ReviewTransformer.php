<?php

namespace App\Transformers\Reviews;

use App\Models\Review;
use League\Fractal\TransformerAbstract;

class ReviewTransformer extends TransformerAbstract
{
    protected $availableIncludes = [
        'user', 'driver',
    ];

    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Review $review)
    {
        return [
            'id' => $review->id,
            'mark' => $review->mark,
            'comment' => $review->comment,
            'date' => $review->created_at->timestamp,
        ];
    }

    public function includeUser(Review $review)
    {
        return $this->item($review->user, new UserTransformer());
    }

    public function includeDriver(Review $review)
    {
        return $this->item($review->driver, new UserTransformer());
    }
}
