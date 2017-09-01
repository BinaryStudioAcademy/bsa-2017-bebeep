<?php

namespace App\Mail;

use App\Models\Trip;
use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class BookingCreatedEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $trip;
    public $booking;

    public function __construct(Booking $booking, Trip $trip)
    {
        $this->trip = $trip;
        $this->booking = $booking;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.booking-created')->subject('Created booking for your trip');
    }
}
