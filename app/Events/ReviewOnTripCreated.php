<?php

namespace App\Events;

use App\Models\Trip;
use App\Models\Review;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;

class ReviewOnTripCreated
{
    use Dispatchable, SerializesModels;
    /**
     * @var Review
     */
    public $review;
    /**
     * @var Trip
     */
    public $trip;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Review $review, Trip $trip)
    {
        $this->review = $review;
        $this->trip = $trip;
    }
}
