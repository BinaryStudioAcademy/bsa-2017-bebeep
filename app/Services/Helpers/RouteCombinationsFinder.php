<?php

namespace App\Services\Helpers;

use Illuminate\Support\Collection;

class RouteCombinationsFinder
{
    private $startRoutes;
    private $innerRoutes;
    private $endRoutes;

    public function __construct(Collection $startRoutes, Collection $innerRoutes, Collection $endRoutes) {
        $this->startRoutes = $startRoutes;
        $this->innerRoutes = $innerRoutes;
        $this->endRoutes = $endRoutes;
    }

    public function find($countSteps = 1)
    {
        return [];
    }
}
