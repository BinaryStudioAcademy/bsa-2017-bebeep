<?php

namespace App\Services;

use App\Models\Booking;
use App\Repositories\Contracts\BookingRepository;
use App\Services\Requests\BookingStatusRequest;

class BookingService implements Contracts\BookingService
{
    protected $bookingRepository;

    public function __construct(BookingRepository $bookingRepository)
    {
        $this->bookingRepository = $bookingRepository;
    }

    /**
     * {@inheritdoc}
     */
    public function changeStatus(BookingStatusRequest $requestStatus, Booking $booking): void
    {
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
    public function approve(Booking $booking): void
    {
        $booking->status = Booking::STATUS_APPROVED;
        $this->bookingRepository->save($booking);
    }

    /**
     * {@inheritdoc}
     */
    public function decline(Booking $booking): void
    {
        $booking->status = Booking::STATUS_DECLINED;
        $this->bookingRepository->save($booking);
    }

}