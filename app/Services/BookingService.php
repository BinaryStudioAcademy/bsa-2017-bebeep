<?php

namespace App\Services;

use App\Models\Trip;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;
use App\Validators\ConfirmBookingValidator;
use App\Services\Requests\BookingStatusRequest;
use App\Repositories\Contracts\BookingRepository;

class BookingService implements Contracts\BookingService
{
    protected $bookingRepository;
    protected $confirmBookingValidator;

    public function __construct(BookingRepository $bookingRepository, ConfirmBookingValidator $confirmBookingValidator)
    {
        $this->bookingRepository = $bookingRepository;
        $this->confirmBookingValidator = $confirmBookingValidator;
    }

    /**
     * {@inheritdoc}
     */
    public function changeStatus(BookingStatusRequest $requestStatus, Trip $trip, Booking $booking): void
    {
        $this->confirmBookingValidator->validate($trip, $booking, Auth::user());

        switch ($requestStatus->getStatus()) {
            case Booking::STATUS_APPROVED:
                $this->approve($booking);
                break;
            case Booking::STATUS_DECLINED:
                $this->decline($booking);
                break;
        }
    }

    /**
     * {@inheritdoc}
     */
    protected function approve(Booking $booking): void
    {
        $booking->status = Booking::STATUS_APPROVED;
        $this->bookingRepository->save($booking);
    }

    /**
     * {@inheritdoc}
     */
    protected function decline(Booking $booking): void
    {
        $booking->status = Booking::STATUS_DECLINED;
        $this->bookingRepository->save($booking);
    }
}
