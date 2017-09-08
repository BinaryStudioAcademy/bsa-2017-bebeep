<?php

namespace App\Repositories;

use App\Models\Subscription;
use App\Http\Requests\DTO\FilterDTO;
use Prettus\Repository\Eloquent\BaseRepository;

class SubscriptionRepository extends BaseRepository implements Contracts\SubscriptionRepository
{
    /**
     * @return string
     */
    public function model()
    {
        return Subscription::class;
    }

    /**
     * {@inheritdoc}
     */
    public function save(Subscription $subscription): Subscription
    {
        $subscription->push();

        return $subscription;
    }

    /**
     * {@inheritdoc}
     */
    public function setFilters(Subscription $subscription, FilterDTO ...$filters) : Subscription
    {
        $data = array_reduce(array_keys($filters), function ($result, $id) use ($filters) {
            $result[$id] = [
                'name' => $filters[$id]->getName(),
                'parameters' => $filters[$id]->getParams(),
            ];

            return $result;
        }, []);

        $subscription->filters->sync($data);

        return $subscription;
    }
}
