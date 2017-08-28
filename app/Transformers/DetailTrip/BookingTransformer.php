<?php

namespace App\Transformers\DetailTrip;

use App\User;
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
     * @param \App\User $user
     * @return array
     */
    public function transform(Booking $booking) : array
    {
        return [
            'id' => $booking->id,
            'status' => $booking->status,
            'user' => $booking->user,
            'seats' => $booking->seats,
        ];
    }

    /**
     * @param \App\Models\Booking $booking
     * @return \League\Fractal\Resource\Item
     */
    public function includeUser(Booking $booking)
    {
        return $this->item($booking->user, new UserPassengerTransformer());
    }
}
