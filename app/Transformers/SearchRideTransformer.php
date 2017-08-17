<?php


namespace App\Transformers;

use App\Models\Route;
use App\Models\Trip;
use App\User;
use League\Fractal\TransformerAbstract;
use Carbon\Carbon;

class SearchRideTransformer extends TransformerAbstract
{
    /**
     * @param Trip $trip
     * @param Route $route
     * @param User $user
     * @return array
     */
    public function transform(Trip $trip, Route $route, User $user): array
    {
        return [
            'collection' => [
                [
                    'id' => $trip->id,
                    'price' => $trip->price,
                    'seats' => 'free seats',
                    'start_date' => 'date',
                    'start_at' => $trip->start_at->timestamp,
                    'route' => [
                        'from' => ['point' => $route->name, 'id' => $route->id], // старт искомой поездки
                        'to' => ['point' => $route->name, 'id' => $route->name], // конец искомой поездки
                        'points' => []
                    ],
                    'user' => [
                        'full_name' => $user->first_name . ' ' . $user->last_name,
                        'age' => Carbon::now()->year - $user->birth_date->year,
                        'first_name' => $user->first_name,
                        'last_name' => $user->last_name,
                        'birth_date' => $user->birth_date->timestamp,
                        'photo' => 'http://lorempixel.com/200/200/'
                    ]
                ]
            ],
            'meta' => [
                'total' => 'count data',
                'price' => [ 'max' => 'max price', 'min' => 'min price' ]
            ]
        ];
    }

}