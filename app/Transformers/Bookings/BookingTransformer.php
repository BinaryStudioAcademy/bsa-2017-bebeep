<?php

namespace App\Transformers\Bookings;

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
        $from = $booking->routes->first();
        $to = $booking->routes->last();

        return [
            'id' => $booking->id,
            'status' => $booking->status,
            'trip_id' => $booking->trip->id,
            'start_at' => (string) $booking->trip->start_at,
            'start_at_x' => (string) $booking->trip->start_at->timestamp,
            'from' => $from && isset($from->from['address_components'])
                ?  isset($from->from['address_components'][0])
                    ? $from->from['address_components'][0]['short_name']
                    : $from->from['formatted_address']
                : null,
            'to' => $to && isset($to->to['address_components'])
                ? isset($to->to['address_components'][0])
                    ? $to->to['address_components'][0]['short_name']
                    : $to->to['formatted_address']
                : null,
        ];
    }
}
