<?php

namespace App\Services\Result;

use Illuminate\Support\Collection;

class SearchTripCollection extends Collection
{
    /**
     * @var array
     */
    protected $meta;

    /**
     * @param array $items
     */
    public function __construct(array $items = [])
    {
        parent::__construct($items);
    }

    /**
     * @param array $items
     *
     * @return $this
     */
    public function setMeta(array $meta): self
    {
        $this->meta = $meta;

        return $this;
    }

    /**
     * @return array
     */
    public function getMeta(): array
    {
        return [
            'total' => $this->meta['count'],
            'price' => [
                'min' => $this->meta['min'],
                'max' => $this->meta['max'],
            ],
        ];
    }
}
