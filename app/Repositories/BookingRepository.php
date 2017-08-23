<?php

namespace App\Repositories;

use App\User;
use App\Models\Trip;
use App\Models\Booking;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

class BookingRepository extends BaseRepository implements Contracts\BookingRepository
{
    /**
     * Specify Model class name.
     *
     * @return string
     */
    public function model()
    {
        return Booking::class;
    }

    /**
     * Boot up the repository, pushing criteria.
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }

    public function save(Booking $booking): Booking
    {
        $booking->save();

        return $booking;
    }

    public function getTripNotDeclinedBookingsCountForUser(Trip $trip, User $user): int
    {
        return $this->model->where([
            'user_id' => $user->id,
            'trip_id' => $trip->id,
        ])->where('status', '!=', Booking::STATUS_DECLINED)->count();
    }
}
