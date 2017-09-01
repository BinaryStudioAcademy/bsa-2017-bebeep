<?php

namespace App\Events;

use App\Models\Booking;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;

class BookingDeclined
{
    use Dispatchable, SerializesModels;

    public $booking;

    /**
     * BookingDeclined constructor.
     * @param Booking $booking
     */
    public function __construct(Booking $booking)
    {
        $this->booking = $booking;
    }
}
