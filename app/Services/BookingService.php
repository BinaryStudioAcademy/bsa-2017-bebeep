<?php

namespace App\Services;

use App\Services\Requests\BookingListRequest;
use App\User;
use App\Models\Trip;
use App\Models\Booking;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use App\Events\ApprovedBookingCanceled;
use App\Validators\CancelBookingValidator;
use App\Validators\CreateBookingValidator;
use App\Validators\ConfirmBookingValidator;
use App\Criteria\Bookings\PastBookingCriteria;
use App\Services\Requests\BookingStatusRequest;
use App\Services\Requests\CreateBookingRequest;
use App\Repositories\Contracts\BookingRepository;
use Prettus\Repository\Contracts\CriteriaInterface;
use App\Criteria\Bookings\UpcommingBookingCriteria;
use App\Services\Contracts\BookingService as BookingServiceContract;

class BookingService implements BookingServiceContract
{
    protected $bookingRepository;
    protected $confirmBookingValidator;
    protected $createBookingValidator;
    private $cancelBookingValidator;

    public function __construct(
        BookingRepository $bookingRepository,
        ConfirmBookingValidator $confirmBookingValidator,
        CreateBookingValidator $createBookingValidator,
        CancelBookingValidator $cancelBookingValidator
    ) {
        $this->createBookingValidator = $createBookingValidator;
        $this->bookingRepository = $bookingRepository;
        $this->confirmBookingValidator = $confirmBookingValidator;
        $this->cancelBookingValidator = $cancelBookingValidator;
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

    /**
     * @param Booking $booking
     * @param User $user
     * @return Booking
     */
    public function cancel(Booking $booking, User $user) : Booking
    {
        $this->cancelBookingValidator->validate($booking, $user);

        if ($booking->status === Booking::STATUS_APPROVED) {
            event(new ApprovedBookingCanceled($booking));
        }

        $booking->status = Booking::STATUS_CANCELED;
        $this->bookingRepository->save($booking);

        return $booking;
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
    public function getList(CriteriaInterface $criteria, int $limit) : LengthAwarePaginator
    {
        $this->bookingRepository->pushCriteria($criteria);
        $result = $this->bookingRepository->paginate($limit);

        return $result;
    }

    /**
     * {@inheritdoc}
     */
    public function getPast(BookingListRequest $request, User $user) : LengthAwarePaginator
    {
        return $this->getList(new PastBookingCriteria($user), $request->getLimit());
    }

    /**
     * {@inheritdoc}
     */
    public function getUpcoming(BookingListRequest $request, User $user) : LengthAwarePaginator
    {
        return $this->getList(new UpcommingBookingCriteria($user), $request->getLimit());
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
