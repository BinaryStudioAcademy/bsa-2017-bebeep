<?php

namespace App\Transformers\Notifications;

use App\Models\Trip;
use League\Fractal\TransformerAbstract;

class TripTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Trip $trip)
    {
        $from = $trip->routes->first()->from;
        $to = $trip->routes->first()->to;

        return [
            'id' => $trip->id,
            'from' => $this->getCity($from),
            'to' => $this->getCity($to),
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
