<?php

namespace App\Services;


use App\Models\Trip;
use App\Services\Result\TripDetail;
use App\Services\Result\RouteDetail;

class TripDetailService implements Contracts\TripDetailService
{
    protected $routeService;

    public function __construct(RouteService $routeService)
    {
        $this->routeService = $routeService;
    }

    public function getDetail(Trip $trip): TripDetail
    {
        $tripDetail = new TripDetail($trip);
        $trip->routes->each(function ($route) use ($tripDetail) {
            $tripDetail->pushRoute(
                (new RouteDetail($route))
                    ->setBusySeats(
                        $this->routeService->countBusySeats($route)
                    )
            );
        });
        return $tripDetail;
    }
}