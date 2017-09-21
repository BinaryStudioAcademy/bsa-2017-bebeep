<?php

namespace App\Transformers\DetailTrip;

use App\Services\Result\RouteDetail;
use League\Fractal\TransformerAbstract;

class RouteTransformer extends TransformerAbstract
{
    /**
     * @var array
     */
    protected $availableIncludes = [
        'bookings',
    ];

    /**
     * A Fractal transformer.
     *
     * @param \App\Services\Result\RouteDetail $route
     * @return array
     */
    public function transform(RouteDetail $route) : array
    {
        return [
            'id' => $route->id,
            'from' => [
                'lng' => $route->from['geometry']['location']['lng'],
                'lat' => $route->from['geometry']['location']['lat'],
                'short_address' => $this->getCity($route->from),
                'address' => $route->from['formatted_address'],
            ],
            'to' => [
                'lng' => $route->to['geometry']['location']['lng'],
                'lat' => $route->to['geometry']['location']['lat'],
                'short_address' => $this->getCity($route->to),
                'address' => $route->to['formatted_address'],
            ],
            'start_at_x' => $route->start_at->timestamp,
            'end_at_x' => $route->end_at->timestamp,
            'reserved_seats' => $route->reservedSeats,
        ];
    }

    /**
     * @param \App\Services\Result\RouteDetail $route
     * @return \League\Fractal\Resource\Collection
     */
    public function includeBookings(RouteDetail $route)
    {
        return $this->collection($route->approvedBookings, new BookingTransformer());
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
