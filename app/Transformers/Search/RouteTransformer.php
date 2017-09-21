<?php

namespace App\Transformers\Search;

use League\Fractal\TransformerAbstract;

class RouteTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(array $route)
    {
        return [
            'id' => $route['id'],
            'point' =>  $this->getCity($route['location']),
            'wanted' => $route['wanted'],
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
