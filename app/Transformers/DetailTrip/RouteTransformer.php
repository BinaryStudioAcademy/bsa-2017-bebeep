<?php

namespace App\Transformers\DetailTrip;

use App\Models\Route;
use League\Fractal\TransformerAbstract;

class RouteTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @param Route $route
     * @return array
     */
    public function transform(Route $route)
    {
        return [
            "id" => $route->id,
            "from" => [
                'lng' => $route->from['geometry']['location']['lng'],
                'lat' => $route->from['geometry']['location']['lat'],
                'short_address' => $route->from['address_components'][0]['short_name'],
                'address' => $route->from['formatted_address']
            ],
            "to" => [
                'lng' => $route->to['geometry']['location']['lng'],
                'lat' => $route->to['geometry']['location']['lat'],
                'short_address' => $route->to['address_components'][0]['short_name'],
                'address' => $route->to['formatted_address'],
            ],
            'seats' => $route->bookings->count()
        ];
    }
}
