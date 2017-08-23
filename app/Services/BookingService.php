<?php

namespace App\Services;

use App\User;
use App\Models\Trip;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;
use App\Validators\CreateBookingValidator;
use App\Validators\ConfirmBookingValidator;
use App\Services\Requests\BookingStatusRequest;
use App\Services\Requests\CreateBookingRequest;
use App\Repositories\Contracts\BookingRepository;
use App\Services\Contracts\BookingService as BookingServiceContract;

class BookingService implements BookingServiceContract
{
    protected $bookingRepository;
    protected $confirmBookingValidator;
    protected $createBookingValidator;

    public function __construct(
        BookingRepository $bookingRepository,
        ConfirmBookingValidator $confirmBookingValidator,
        CreateBookingValidator $createBookingValidator
    ) {
        $this->createBookingValidator = $createBookingValidator;
        $this->bookingRepository = $bookingRepository;
        $this->confirmBookingValidator = $confirmBookingValidator;
    }

    /**
     * @param Trip $trip
     * @param CreateBookingRequest $request
     * @param User $user
     * @return Booking
     */
    public function create(Trip $trip, CreateBookingRequest $request, User $user)
    {
        $this->createBookingValidator->validate($trip, $user, $request);

        $booking = $this->bookingRepository->save(new Booking([
            'trip_id' => $trip->id,
            'user_id' => $user->id,
            'seats' => $request->getSeats(),
        ]));

        $booking->routes()->sync($request->getRoutes());

        return $booking;
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

    public function cancel(Booking $booking, User $user)
    {
        $this->cancelBookingValidator->validate($booking, $user);
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
