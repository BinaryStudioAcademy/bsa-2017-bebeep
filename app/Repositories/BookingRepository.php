<?php

namespace App\Repositories;

use App\Models\Booking;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;

/**
 * Class BookingRepositoryEloquent
 * @package namespace App\Repositories;
 */
class BookingRepository extends BaseRepository implements Contracts\BookingRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Booking::class;
    }

    /**
     * Boot up the repository, pushing criteria
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
}
