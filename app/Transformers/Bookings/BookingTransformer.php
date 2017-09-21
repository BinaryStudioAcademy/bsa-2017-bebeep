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
                ?  $this->getCity($from->from)
                : null,
            'to' => $to && isset($to->to['address_components'])
                ? $this->getCity($to->to)
                : null,
        ];
    }

    protected function getCity(array $route)
    {
        $city = '';
        if (isset($route['formatted_address'])) {
            $city = $route['formatted_address'];
        }
        if (isset($route['address_components'])) {
            $city = array_reduce(
                $route['address_components'],
                function ($address, $component) {
                    return in_array('locality', $component['types'])
                        ? $component['short_name']
                        : $address;
                },
                $route['formatted_address']
            );
        }

        return $city;
    }
}
