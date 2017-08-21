<?php

namespace App\Services\Contracts;

use App\Models\Booking;
use App\Services\Requests\BookingStatusRequest;

interface BookingService
{
    /**
     * @param BookingStatusRequest $requestStatus
     * @return mixed
     */
    public function changeStatus(BookingStatusRequest $requestStatus, Booking $booking) : void;

    /**
     * Approve booking
     *
     * @param Booking $booking
     */
    public function approve(Booking $booking): void;

    /**
     * Decline booking
     *
     * @param Booking $booking
     */
    public function decline(Booking $booking): void;
}
