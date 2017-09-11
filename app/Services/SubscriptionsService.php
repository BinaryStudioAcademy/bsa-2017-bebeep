<?php

namespace App\Services;

use App\User;
use App\Models\Trip;
use App\Models\Subscription;
use Illuminate\Support\Collection;
use App\Services\Requests\CreateSubscriptionsRequest;
use App\Repositories\Contracts\SubscriptionRepository;
use App\Criteria\Subscriptions\SubscriptionTripCriteria;
use App\Services\Helpers\Subscriptions\FilterCollection;
use App\Exceptions\Subscriptions\SubscriptionEmailExistsException;

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
     * This method update user id after register
     *
     * @param string $email
     * @param User $user
     */
    public function updateUserIdAfterRegister(string $email, User $user)
    {
        $isExists = $this->subscriptionRepository->isEmailExists($email);

        if($isExists) {
            $this->subscriptionRepository->updateUserIdByEmail($email, $user);
        }
    }

    /**
     * This method create subscription
     *
     * @param CreateSubscriptionsRequest $request
     * @return Subscription
     * @throws SubscriptionEmailExistsException
     */
    public function create(CreateSubscriptionsRequest $request)
    {
        $isEmailExists = $this->subscriptionRepository->isEmailExists($request->getEmail());

        if($isEmailExists) {
            throw new SubscriptionEmailExistsException("This email exists!");
        }

        $subscriptionAttributes = [
            'start_at' => $request->getStartAt(),
            'from' => $request->getFrom(),
            'from_lat' => $request->getFromLat(),
            'from_lng' => $request->getFromLng(),
            'to' => $request->getTo(),
            'to_lat' => $request->getToLat(),
            'to_lng' => $request->getToLng(),
            'email' => $request->getEmail(),
            'user_id' => $request->getUserId(),
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
