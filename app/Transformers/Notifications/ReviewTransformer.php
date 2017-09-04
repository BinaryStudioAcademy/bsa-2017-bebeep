<?php

namespace App\Transformers\Notifications;

use App\Models\Review;
use League\Fractal\TransformerAbstract;

class ReviewTransformer extends TransformerAbstract
{
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
            'user' => [
                "id" => $review->user->id,
                "last_name" => $review->user->last_name,
                'first_name' => $review->user->first_name,
            ],
        ];
    }
}
