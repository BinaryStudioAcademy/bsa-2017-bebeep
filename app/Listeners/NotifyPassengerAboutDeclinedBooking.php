<?php

namespace App\Listeners;

use App\Events\BookingDeclined;
use App\Mail\BookingDeclinedEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Contracts\Queue\ShouldQueue;

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

        Mail::to($user)->send(new BookingDeclinedEmail($event->booking, $event->booking->trip));
    }
}
