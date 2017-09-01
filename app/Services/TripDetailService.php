<?php

namespace App\Services;

use App\User;
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
     * {@inheritdoc}
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

    /**
     * {@inheritdoc}
     */
    public function hasBookings(Trip $trip, User $user) : bool
    {
        return $trip->bookings()->whereUserId($user->id)->count() > 0;
    }

    /**
     * {@inheritdoc}
     */
    public function isOwner(Trip $trip, User $user) : bool
    {
        return $trip->user->id === $user->id;
    }
}
