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
        return $filter->toArray();
    }
}
