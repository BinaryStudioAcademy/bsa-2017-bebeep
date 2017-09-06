<?php

namespace App\Listeners;

use App\Events\BookingApproved;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Notifications\BookingApproved as NotificationBookingApproved;

class NotifyPassengerAboutApprovedBooking implements ShouldQueue
{
    /**
     * Handle the event.
     *
     * @param  BookingApproved  $event
     * @return void
     */
    public function handle(BookingApproved $event)
    {
        $user = $event->booking->user;

        $user->notify(new NotificationBookingApproved($event->booking));
    }
}
