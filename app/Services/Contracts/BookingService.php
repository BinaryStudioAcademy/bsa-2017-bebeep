<?php

namespace App\Services\Contracts;

use App\Models\Trip;
use App\Models\Booking;
use App\Services\Requests\BookingStatusRequest;
use App\Exceptions\Booking\BookingConfirmException;

interface BookingService
{
    /**
     * @param BookingStatusRequest $requestStatus
     * @param Trip $trip
     * @param Booking $booking
     * @throws BookingConfirmException
     */
    public function changeStatus(BookingStatusRequest $requestStatus, Trip $trip, Booking $booking) : void;
}
