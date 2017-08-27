<?php

namespace App\Services\Contracts;

use App\User;
use App\Models\Trip;
use App\Models\Booking;
use App\Services\Requests\BookingListRequest;
use App\Services\Requests\BookingStatusRequest;
use App\Exceptions\Booking\BookingConfirmException;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

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
     * @param BookingListRequest $request
     * @param User $user
     * @return LengthAwarePaginator
     */
    public function getPast(BookingListRequest $request, User $user) : LengthAwarePaginator;

    /**
     * @param BookingListRequest $request
     * @param User $user
     * @return LengthAwarePaginator
     */
    public function getUpcoming(BookingListRequest $request, User $user) : LengthAwarePaginator;
}
