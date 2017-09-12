<?php

namespace App\Transformers\Subscriptions;

use App\Models\Filter;
use League\Fractal\TransformerAbstract;

class FilterTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Filter $filter)
    {
        return [
            'id' => $filter->id,
            'name' => $filter->name,
            'parameters' => $filter->parameters,
            'subscription_id' => $filter->subscription_id,
        ];
    }
}
