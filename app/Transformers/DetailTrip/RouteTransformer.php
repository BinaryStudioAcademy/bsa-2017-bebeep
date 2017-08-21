<?php

namespace App\Transformers\DetailTrip;

use App\Models\Booking;
use App\Models\Route;
use App\Services\Contracts\RouteService;
use League\Fractal\TransformerAbstract;

class RouteTransformer extends TransformerAbstract
{
    protected $routeService;

    public function __construct(RouteService $routeService)
    {
        $this->routeService = $routeService;
    }

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
            'busy_seats' => $this->routeService->countBusySeats($route),
        ];
    }
}
