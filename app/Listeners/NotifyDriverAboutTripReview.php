<?php

namespace App\Listeners;

use App\Events\ReviewOnTripCreated;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Notifications\ReviewOnTripCreated as NotificationReviewCreated;

class NotifyDriverAboutTripReview implements ShouldQueue
{
    /**
     * Handle the event.
     *
     * @param  ReviewOnTripCreated  $event
     * @return void
     */
    public function handle(ReviewOnTripCreated $event)
    {
        /** @var \App\User $driver */
        $driver = $event->review->driver;

        $driver->notify(new NotificationReviewCreated($event->review, $event->trip));
    }
}
