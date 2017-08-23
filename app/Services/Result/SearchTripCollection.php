<?php

namespace App\Services\Result;

use \InvalidArgumentException;
use Illuminate\Support\Collection;

class SearchTripCollection extends Collection
{
    protected $meta;

    public function __construct($items = [])
    {
        parent::__construct($items);
    }

    public function setMeta(array $meta)
    {
        $this->meta = $meta;
    }

    public function getMeta() : array
    {
        return [
            'total' => $this->meta['count'],
            'price' => ['min' => $this->meta['min'], 'max' => $this->meta['max']],
        ];
    }
}
