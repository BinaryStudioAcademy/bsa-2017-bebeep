<?php

namespace App\Events;

use App\Models\Booking;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;

class BookingCreated
{
    use Dispatchable, SerializesModels;

    public $booking;

    /**
     * BookingCreated constructor.
     * @param Booking $booking
     */
    public function __construct(Booking $booking)
    {
        $this->booking = $booking;
    }
}
