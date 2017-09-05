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
        $first = $booking->routes->first();
        $last = $booking->routes->last();

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
                'from' => $first ? $this->getCity($first->from) : "",
                'to' => $last ? $this->getCity($last->to) : "",
            ],
        ];
    }

    protected function getCity(array $route)
    {
        $city = "";
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
