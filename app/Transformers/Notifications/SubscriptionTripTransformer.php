<?php

namespace App\Transformers\Notifications;

use App\Models\Trip;
use App\Models\Review;
use League\Fractal\TransformerAbstract;

class SubscriptionTripTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Trip $trip)
    {
        $first = $trip->routes->first();
        $last = $trip->routes->last();
        $receivedReviews = collect($trip->user->receivedReviews);

        return [
            'from' => $first ? $this->getCity($first->from) : '',
            'to' => $last ? $this->getCity($first->to) : '',
            'start_at' => $trip->start_at->timestamp,
            'params' => [
                'luggage_size' => $trip->luggage_size,
                'seats' => $trip->seats,
                'animals' => $trip->is_animals_allowed,
                'price' => $trip->price,
                'rating' => $receivedReviews->count() > 0
                    ? $receivedReviews->reduce(function ($rating, Review $review) {
                        return $rating + $review->mark;
                    }, 0) / $receivedReviews->count()
                    : 0,
            ],
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
