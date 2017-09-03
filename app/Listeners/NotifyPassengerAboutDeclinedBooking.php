<?php

namespace App\Listeners;

use App\Events\BookingDeclined;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Notifications\BookingDeclined as NotificationBookingDeclined;

class NotifyPassengerAboutDeclinedBooking implements ShouldQueue
{
    /**
     * Handle the event.
     *
     * @param  BookingDeclined  $event
     * @return void
     */
    public function handle(BookingDeclined $event)
    {
        $user = $event->booking->user;

        $user->notify(new NotificationBookingDeclined($event->booking));
    }
}
