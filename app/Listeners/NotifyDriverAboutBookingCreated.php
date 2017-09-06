<?php

namespace App\Listeners;

use App\User;
use App\Events\BookingCreated;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Notifications\BookingCreated as NotificationBookingCreated;

class NotifyDriverAboutBookingCreated implements ShouldQueue
{
    /**
     * Handle the event.
     *
     * @param  BookingCreated  $event
     * @return void
     */
    public function handle(BookingCreated $event)
    {
        /** @var User $driver */
        $driver = $event->booking->trip->user;

        $driver->notify(new NotificationBookingCreated($event->booking));
    }
}
