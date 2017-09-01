<?php

namespace App\Listeners;

use App\Events\BookingDeclined;
use App\Mail\BookingDeclinedEmail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendBookingDeclinedEmailToPassenger implements ShouldQueue
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
