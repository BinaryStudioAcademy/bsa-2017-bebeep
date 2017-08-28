<?php

namespace App\Services;

use App\Models\Trip;
use App\Services\Result\TripDetail;
use App\Services\Result\RouteDetail;

class TripDetailService implements Contracts\TripDetailService
{
    /**
     * @var \App\Services\RouteService
     */
    protected $routeService;

    /**
     * @param \App\Services\RouteService $routeService
     */
    public function __construct(RouteService $routeService)
    {
        $this->routeService = $routeService;
    }

    /**
     * @inheritdoc
     */
    public function getDetail(Trip $trip) : TripDetail
    {
        $tripDetail = new TripDetail($trip);

        $trip->routes->each(function ($route) use ($tripDetail) {
            $tripDetail->pushRoute(
                (new RouteDetail($route))
                    ->setReservedSeats(
                        $this->routeService->countReservedSeats($route)
                    )
            );
        });

        return $tripDetail;
    }
}
