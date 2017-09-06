<?php

namespace App\Services;

use App\Models\Subscription;
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
        foreach ($filters as $filter) {
            $params->push([
                'name' => $filter['name'],
                'parameters' => json_encode($filter['parameters']),
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
        $subscriptionAttributes = [
            'start_at' => $request->getStartAt(),
            'from' => $request->getFrom(),
            'from_lat' => $request->getFromLat(),
            'from_lng' => $request->getFromLng(),
            'to' => $request->getTo(),
            'to_lat' => $request->getToLat(),
            'to_lng' => $request->getToLng(),
            'email' => $request->getEmail(),
            'is_active' => true,
        ];

        $subscription = $this->subscriptionRepository->save(new Subscription($subscriptionAttributes));

        foreach ($request->getFilters() as $filter) {
            $filterAttributes = [
                'name' => $filter->getName(),
                'parameters' => $filter->getParam(),
            ];
            $subscription->filters()->create($filterAttributes);
        }


        return $subscription;
    }
}