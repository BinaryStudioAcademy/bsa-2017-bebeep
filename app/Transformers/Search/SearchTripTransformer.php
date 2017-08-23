<?php


namespace App\Transformers\Search;

use App\User;
use App\Models\Trip;
use App\Models\Route;
use App\Services\Result\SearchTrip;
use Illuminate\Support\Collection;
use League\Fractal\TransformerAbstract;
use Carbon\Carbon;

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
            'seats' => $trip->seats,
            'start_date' => (string) $trip->start_at,
            'start_at' => $trip->start_at->timestamp
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
