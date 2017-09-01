<?php

namespace App\Listeners;

use App\Events\BookingCreated;
use App\Mail\BookingCreatedEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendBookingCreatedEmailToDriver implements ShouldQueue
{
    /**
     * Handle the event.
     *
     * @param  BookingCreated  $event
     * @return void
     */
    public function handle(BookingCreated $event)
    {
        $driver = $event->booking->trip->user;

        Mail::to($driver)->send(new BookingCreatedEmail($event->booking, $event->booking->trip));
    }
}
