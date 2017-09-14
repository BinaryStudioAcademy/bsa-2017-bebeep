<?php

namespace App\Services;

use App\User;
use App\Models\Trip;
use App\Models\Filter;
use App\Models\Subscription;
use Illuminate\Support\Collection;
use App\Http\Requests\DTO\FilterDTO;
use App\Repositories\UserRepository;
use App\Services\Requests\CreateSubscriptionsRequest;
use App\Repositories\Contracts\SubscriptionRepository;
use App\Criteria\Subscriptions\SubscriptionTripCriteria;
use App\Services\Helpers\Subscriptions\FilterCollection;
use App\Services\Requests\Subscriptions\EditSubscriptionRequest;
use App\Exceptions\Subscriptions\SubscriptionEmailExistsException;
use App\Services\Requests\Subscriptions\StatusSubscriptionRequest;

class SubscriptionsService implements Contracts\SubscriptionsService
{
    /**
     * @var SubscriptionRepository
     */
    private $subscriptionRepository;

    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * @var FilterCollection
     */
    private $filterCollection;

    /**
     * SubscriptionsService constructor.
     *
     * @param SubscriptionRepository $subscriptionRepository
     * @param FilterCollection $filterCollection
     * @param UserRepository $userRepository
     */
    public function __construct(
        SubscriptionRepository $subscriptionRepository,
        FilterCollection $filterCollection,
        UserRepository $userRepository
    ) {
        $this->subscriptionRepository = $subscriptionRepository;
        $this->filterCollection = $filterCollection;
        $this->userRepository = $userRepository;
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
     * This method update user id after register.
     *
     * @param string $email
     * @param User $user
     */
    public function updateUserIdAfterRegister(string $email, User $user)
    {
        $isExists = $this->subscriptionRepository->isEmailExists($email);

        if ($isExists) {
            $this->subscriptionRepository->updateUserIdByEmail($email, $user);
        }
    }

    /**
     * This method create subscription.
     *
     * @param CreateSubscriptionsRequest $request
     * @return Subscription
     * @throws SubscriptionEmailExistsException
     * {@inheritdoc}
     */
    public function getByUser(User $user): Collection
    {
        return collect($this->subscriptionRepository->findByField('email', $user->email));
    }

    /**
     * {@inheritdoc}
     */
    public function changeStatus(StatusSubscriptionRequest $request, Subscription $subscription): void
    {
        $subscription->is_active = $request->isActive();

        $this->subscriptionRepository->save($subscription);
    }

    /**
     * {@inheritdoc}
     */
    public function edit(EditSubscriptionRequest $request, Subscription $subscription): Subscription
    {
        /** @var FilterDTO[] $filters */
        $newFilters = collect($request->getFilters());
        /** @var Collection $filters */
        $filters = $subscription->filters;

        $data = $newFilters->map(function (FilterDTO $filter) use ($filters) {
            $f = $filters->where('name', $filter->getName())->first();
            if ($f) {
                $f->parameters = $filter->getParams();
            } else {
                $f = new Filter;
                $f->name = $filter->getName();
                $f->parameters = $filter->getParams();
            }

            return $f;
        });

        return $this->subscriptionRepository->setFilters($subscription, ...$data);
    }

    /**
     * {@inheritdoc}
     */
    public function delete(Subscription $subscription): void
    {
        $this->subscriptionRepository->delete($subscription->id);
    }

    /**
     * {@inheritdoc}
     */
    public function create(CreateSubscriptionsRequest $request)
    {
        $userId = $request->getUserId();
        $isEmailExists = $this->userRepository->isEmailExists($request->getEmail());

        if (is_null($userId) && $isEmailExists) {
            throw new SubscriptionEmailExistsException('This user exists!');
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
            'user_id' => $userId,
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
