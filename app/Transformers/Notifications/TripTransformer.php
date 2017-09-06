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
        $from = $trip->routes->first();
        $to = $trip->routes->first();

        return [
            'id' => $trip->id,
            'from' => $from ? $this->getCity($from->from) : '',
            'to' => $to ? $this->getCity($to->to) : '',
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
