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
     * @param $trip
     * @return array
     */
    public function transform($trip): array
    {
        return [
//            'collection' => [
//                [
                    'id' => $trip->trips_id,
                    'price' => $trip->price,
                    'seats' => $trip->seats,
                    'start_date' => $trip->start_at,
                    'start_at' => $trip->start_at,
                    'route' => [
                        'from' => ['point' => $trip->from, 'id' => 'id'],
                        'to' => ['point' => $trip->to, 'id' => 'route_id'],
                        'points' => []
                    ],
                    'user' => [
                        'full_name' => $trip->first_name . ' ' . $trip->last_name,
                        'age' => Carbon::now()->year - Carbon::createFromFormat('Y-m-d', $trip->birth_date)->year,
                        'last_name' => $trip->last_name,
                        'birth_date' => $trip->birth_date,
                        'photo' => 'http://lorempixel.com/200/200/'
                    ]
//                ]
//            ],
//            'meta' => [
//                'total' => count($trip),
//                'price' => [ 'max' => 'max price', 'min' => 'min price' ],
//                'trip'  => $trip
//            ]
        ];
    }

}