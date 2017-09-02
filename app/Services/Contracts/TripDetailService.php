<?php

namespace App\Services\Contracts;

use App\User;
use App\Models\Trip;
use App\Services\Result\TripDetail;

interface TripDetailService
{
    /**
     * Get the trip details.
     *
     * @param Trip $trip
     *
     * @return \App\Services\Result\TripDetail
     */
    public function getDetail(Trip $trip) : TripDetail;

    /**
     * @param Trip $trip
     * @param User $user
     * @return bool
     */
    public function hasBookings(Trip $trip, User $user) : bool;

    /**
     * @param Trip $trip
     * @param User $user
     * @return bool
     */
    public function isOwner(Trip $trip, User $user) : bool;
}
