<?php

namespace App\Transformers\DriverTrip;

use App\Models\Booking;
use League\Fractal\TransformerAbstract;

class BookingTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Booking $booking)
    {
        return [
            'id' => $booking->id,
            'status' => $booking->status,
            'first_name' => $booking->user->first_name,
            'last_name' => $booking->user->last_name,
            'img' => $booking->user->getAvatarUrl(),
            'user_id' => $booking->user_id,
        ];
    }
}
