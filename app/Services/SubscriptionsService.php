<?php

namespace App\Services;

use App\Models\Trip;
use App\Models\Subscription;
use Illuminate\Support\Collection;
use App\Services\Requests\CreateSubscriptionsRequest;
use App\Repositories\Contracts\SubscriptionRepository;
use App\Services\Helpers\Subscriptions\FilterCollection;
use App\Criteria\Subscriptions\SubscriptionTripCriteria;

class SubscriptionsService implements Contracts\SubscriptionsService
{
    /**
     * @var SubscriptionRepository
     */
    private $subscriptionRepository;

    /**
     * @var FilterCollection
     */
    private $filterCollection;

    public function __construct(SubscriptionRepository $subscriptionRepository, FilterCollection $filterCollection)
    {
        $this->subscriptionRepository = $subscriptionRepository;
        $this->filterCollection = $filterCollection;
    }

    /**
     * {@inheritdoc}
     */
    public function getSubscriptionsByTrip(Trip $trip): Collection
    {
        $collection = collect($this->subscriptionRepository->getByCriteria(new SubscriptionTripCriteria($trip)));

        $subscriptions = $collection->filter(function (Subscription $subscription) use ($trip) {
            return $this->filterCollection->isSatisfied($subscription, $trip);
        });

        return $subscriptions;
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
                'parameters' => $filter->getParams(),
            ];
            $subscription->filters()->create($filterAttributes);
        }

        return $subscription;
    }
}
