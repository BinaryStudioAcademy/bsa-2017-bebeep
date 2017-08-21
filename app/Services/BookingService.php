<?php

namespace App\Services;

use App\Models\Trip;
use App\Services\Contracts\BookingService as BookingServiceContract;
use App\Services\Requests\CreateBookingRequest;
use App\User;
use App\Validators\CreateBookingValidator;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;
use App\Validators\ConfirmBookingValidator;
use App\Services\Requests\BookingStatusRequest;
use App\Repositories\Contracts\BookingRepository;

class BookingService implements BookingServiceContract
{
    protected $bookingRepository;
    protected $confirmBookingValidator;
    protected $createBookingValidator;

    public function __construct(BookingRepository $bookingRepository, ConfirmBookingValidator $confirmBookingValidator, CreateBookingValidator $createBookingValidator)
    {
        $this->createBookingValidator = $createBookingValidator;
        $this->bookingRepository = $bookingRepository;
        $this->confirmBookingValidator = $confirmBookingValidator;
    }

    public function create(Trip $trip, CreateBookingRequest $request, User $user)
    {
        $this->createBookingValidator->validate($trip, $user, $request);
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
