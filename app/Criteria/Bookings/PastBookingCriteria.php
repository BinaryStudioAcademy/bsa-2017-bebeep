<?php

namespace App\Criteria\Bookings;

use App\User;
use Carbon\Carbon;
use App\Models\Booking;
use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

class PastBookingCriteria implements CriteriaInterface
{
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * @param Booking $model
     * @param RepositoryInterface $repository
     * @return mixed
     */
    public function apply($model, RepositoryInterface $repository)
    {
        return $model->select($model->getTable().'.*')
            ->join('trips', 'trips.id', '=', $model->getTable().'.trip_id')
            ->where('trips.end_at', '<=', Carbon::now())
            ->where($model->getTable().'.user_id', $this->user->id)
            ->with(['routes', 'trip'])
            ->orderBy('trips.start_at', 'desc');
    }
}
