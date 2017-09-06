<?php

namespace App\Listeners;

use App\Notifications\BookingCanceled;
use App\Events\ApprovedBookingCanceled;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifyDriverAboutCanceledBooking implements ShouldQueue
{
    /**
     * @param ApprovedBookingCanceled $event
     */
    public function handle(ApprovedBookingCanceled $event)
    {
        /** @var \App\User $driver */
        $driver = $event->booking->trip->user;

        $driver->notify(new BookingCanceled($event->booking));
    }
}
