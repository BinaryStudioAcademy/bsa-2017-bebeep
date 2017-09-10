<?php

namespace App\Services\Helpers;

use Illuminate\Support\Collection;

class RouteCombinationsFinder
{
    private $endRoutesPoints;
    private $startRoutes;
    private $innerRoutes;
    private $endRoutes;
    private $maxTransfers = 1;
    private $result;

    /**
     * RouteCombinationsFinder constructor.
     * @param Collection $startRoutes
     * @param Collection $innerRoutes
     * @param Collection $endRoutes
     */
    public function __construct(Collection $startRoutes, Collection $innerRoutes, Collection $endRoutes) {
        $this->startRoutes = $startRoutes->map(function($route) {return new RouteContainer($route);});
        $this->innerRoutes = $innerRoutes->map(function($route) {return new RouteContainer($route);});
        $this->endRoutes = $endRoutes->map(function($route) {return new RouteContainer($route);});
        $this->endRoutesPoints = $this->endRoutes->map(function(RouteContainer $route) {return $route->endPoint();});
    }

    /**
     * @param int $maxTransfers
     * @return Collection
     */
    public function find($maxTransfers = 1)
    {
        $this->maxTransfers = $maxTransfers;
        $this->result = collect([]);

        $this->startRoutes->each(function(RouteContainer $routeContainer) {
            $routeGroup = new RouteGroup();

            $this->addRoutesToRouteGroup($routeGroup, $routeContainer);
        });

        return $this->result;
    }

    /**
     * @param RouteGroup $routeGroup
     * @param RouteContainer $routeContainer
     * @return bool
     */
    private function addRoutesToRouteGroup(RouteGroup $routeGroup, RouteContainer $routeContainer)
    {
        $routeGroup->addRoute($routeContainer->getRoute());

        if (count($routeGroup->getRoutes()) > $this->maxTransfers + 1) {
            return true;
        }

        if ($routeContainer->endPoint()->minDistanceToAny($this->endRoutesPoints) <= 1) {
            $this->result->push($routeGroup);

            return true;
        }

        $possibleNextRoutesContainers = $this->innerRoutes->filter(function(RouteContainer $innerRouteContainer) use ($routeContainer) {
            return $innerRouteContainer->startPoint()->minDistanceToAny(collect([$routeContainer->endPoint()])) <= 1;
        });

        if ($possibleNextRoutesContainers->count() <= 0) {
            return true;
        }

        foreach ($possibleNextRoutesContainers as $routesContainer) {
            $this->addRoutesToRouteGroup(clone $routeGroup, $routesContainer);
        }

        return true;
    }
}
