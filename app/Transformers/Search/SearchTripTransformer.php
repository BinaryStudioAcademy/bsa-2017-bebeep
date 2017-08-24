<?php

namespace App\Transformers\Search;

use Illuminate\Support\Collection;
use App\Services\Result\SearchTrip;
use League\Fractal\TransformerAbstract;

class SearchTripTransformer extends TransformerAbstract
{
    protected $availableIncludes = [
        'routes',
        'driver',
    ];

    /**
     * @param $trip
     * @return array
     */
    public function transform(SearchTrip $trip): array
    {
        return [
            'id' => $trip->id,
            'price' => $trip->price,
            'seats' => $trip->available_seats,
            'start_date' => (string) $trip->start_at,
            'start_at' => $trip->start_at->timestamp,
            'from' => fractal()->item($trip->getFromPoint(), new RouteTransformer())->toArray(),
            'to' => fractal()->item($trip->getToPoint(), new RouteTransformer())->toArray(),
        ];
    }

    public function includeRoutes(SearchTrip $trip)
    {
        return $this->collection(Collection::make($trip->routes), new RouteTransformer());
    }

    public function includeDriver(SearchTrip $trip)
    {
        return $this->item($trip->driver, new DriverTransformer());
    }
}
