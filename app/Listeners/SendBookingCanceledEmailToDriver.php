<?php

namespace App\Listeners;

use Mail;
use App\Mail\BookingCanceledEmail;
use App\Events\ApprovedBookingCanceled;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendBookingCanceledEmailToDriver implements ShouldQueue
{
    /**
     * @param ApprovedBookingCanceled $event
     */
    public function handle(ApprovedBookingCanceled $event)
    {
        $driver = $event->booking->trip->user;

        Mail::to($driver)->send(new BookingCanceledEmail($event->booking, $event->booking->trip));
    }
}
