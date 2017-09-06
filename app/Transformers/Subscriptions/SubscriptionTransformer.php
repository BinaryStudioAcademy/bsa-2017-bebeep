<?php

namespace App\Transformers\Subscriptions;

use App\Models\Subscription;
use League\Fractal\TransformerAbstract;

class SubscriptionTransformer extends TransformerAbstract
{
    protected $availableIncludes = [
        'filters',
    ];

    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Subscription $subscription)
    {
        return $subscription->toArray();
    }

    public function includeFilters(Subscription $subscription)
    {
        return $this->collection($subscription->filters, new FilterTransformer());
    }
}
