<?php

namespace App\Services\Contracts;

use App\Models\Trip;
use App\Services\Result\TripDetail;

interface TripDetailService
{
    public function getDetail(Trip $trip) : TripDetail;
}
