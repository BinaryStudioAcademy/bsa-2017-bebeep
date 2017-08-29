<?php

namespace App\Services\Contracts;

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
}
