<?php

namespace App\Listeners;

use App\Events\BookingApproved;
use App\Mail\BookingApprovedEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendBookingApprovedEmailToPassenger implements ShouldQueue
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

        Mail::to($user)->send(new BookingApprovedEmail($event->booking, $event->booking->trip));
    }
}
