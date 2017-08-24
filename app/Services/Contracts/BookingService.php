<?php

namespace App\Services\Contracts;

use App\User;
use App\Models\Trip;
use App\Models\Booking;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
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

    /**
     * @param Booking $booking
     * @param User $user
     * @return Booking
     */
    public function cancel(Booking $booking, User $user) : Booking;

    /**
     * @param User $user
     * @return LengthAwarePaginator
     */
    public function getPast(User $user) : LengthAwarePaginator;

    /**
     * @param User $user
     * @return LengthAwarePaginator
     */
    public function getUpcoming(User $user) : LengthAwarePaginator;
}
