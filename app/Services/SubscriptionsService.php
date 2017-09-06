<?php

namespace App\Services;

use App\Models\Subscription;
use App\Models\Filter;
use App\Repositories\SubscriptionRepository;
use App\Services\Requests\CreateSubscriptionsRequest;

class SubscriptionsService implements Contracts\SubscriptionsService
{
    /**
     * @var SubscriptionRepository
     */
    private $subscriptionRepository;

    /**
     * SubscriptionsService constructor.
     *
     * @param SubscriptionRepository $subscriptionRepository
     */
    public function __construct(SubscriptionRepository $subscriptionRepository)
    {
        $this->subscriptionRepository = $subscriptionRepository;
    }

    /**
     * @param $filters
     *
     * @return \Illuminate\Support\Collection
     */
     public static function getParamsFromFilters($filters)
    {
        $params = collect([]);
        foreach ($filters as $filter){
            $params->push( [
                'name' => $filter['name'],
                'parameters' =>json_encode($filter['parameters']),
            ]);
        }

        return $params;
    }

    /**
     * @param CreateSubscriptionsRequest $request
     *
     * @return Subscription
     */
    public function create(CreateSubscriptionsRequest $request)
    {
        $start_point = $request->getFrom();
        $end_point = $request->getTo();
        $filters = $request->getFilters();

        $subscriptionAttributes = [
            'start_at' => $request->getStartAt(),
            'from' => $start_point['from'],
            'from_lat' => $start_point['from_lat'],
            'from_lng' => $start_point['from_lng'],
            'to' => $end_point['to'],
            'to_lat' => $end_point['to_lat'],
            'to_lng' => $end_point['to_lng'],
            'email' => $request->getEmail(),
            'is_active' => true,
        ];

        $subscription = $this->subscriptionRepository->save(new Subscription($subscriptionAttributes));

        if (isset($filters)){
            $filters = self::getParamsFromFilters($filters);

            foreach ($filters as $filter){
                $subscription->filters()->create($filter);
            }
        }

        return $subscription;
    }

}