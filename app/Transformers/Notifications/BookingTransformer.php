<?php

namespace App\Transformers\Notifications;

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
        $from = $booking->routes->first()->from;
        $to = $booking->routes->last()->to;

        return [
            'booking' => [
                'id' => $booking->id,
                'seats' => $booking->seats,
            ],
            'user' => [
                'id' => $booking->user->id,
                'first_name' => $booking->user->first_name,
                'last_name' => $booking->user->last_name,
            ],
            'driver' => [
                'id' => $booking->trip->user->id,
                'first_name' => $booking->trip->user->first_name,
                'last_name' => $booking->trip->user->last_name,
            ],
            'trip' => [
                'trip_id' => $booking->trip->id,
                'start_at' => $booking->trip->start_at->timestamp,
            ],
            'routes' => [
                'from' => $this->getCity($from),
                'to' => $this->getCity($to),
            ],
        ];
    }

    protected function getCity(array $route)
    {
        return array_reduce(
            $route['address_components'],
            function ($address, $component) {
                return in_array('locality', $component['types'])
                    ? $component['short_name']
                    : $address;
            },
            $route['formatted_address']
        );
    }
}
