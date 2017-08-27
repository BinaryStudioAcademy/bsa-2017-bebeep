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
            'point' =>  $route['location']['address_components'][0]['short_name']
                ?? $route['location']['formatted_address'],
            'wanted' => $route['wanted'],
        ];
    }
}
