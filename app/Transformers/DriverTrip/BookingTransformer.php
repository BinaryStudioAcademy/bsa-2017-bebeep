<?php

namespace App\Transformers\DriverTrip;

use App\Models\Booking;
use League\Fractal\TransformerAbstract;

class BookingTransformer extends TransformerAbstract
{
    /**
     * @var array
     */
    protected $availableIncludes = [
        'user',
    ];

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
            'seats' => $booking->seats,
            'user' => $booking->user,
        ];
    }

    /**
     * @param \App\Models\Booking $booking
     * @return \League\Fractal\Resource\Item
     */
    public function includeUser(Booking $booking)
    {
        return $this->item($booking->user, new UserTransformer());
    }
}
