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
        return [
            'id' => $subscription->id,
            'start_at' => $subscription->start_at,
            'start_at_x' => $subscription->start_at->timestamp,
            'from' => $subscription->from,
            'to' => $subscription->to,
            'to_lng' => $subscription->to_lng,
            'to_lat' => $subscription->to_lat,
            'from_lat' => $subscription->from_lat,
            'from_lng' => $subscription->from_lng,
            'is_active' => $subscription->is_active,
            'email' => $subscription->email,
        ];
    }

    public function includeFilters(Subscription $subscription)
    {
        return $this->collection($subscription->filters, new FilterTransformer());
    }
}
