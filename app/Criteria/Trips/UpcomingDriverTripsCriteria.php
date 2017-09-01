<?php

namespace App\Criteria\Trips;

use App\User;
use Carbon\Carbon;
use App\Models\Booking;
use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

class UpcomingDriverTripsCriteria implements CriteriaInterface
{
    private $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function apply($model, RepositoryInterface $repository)
    {
        return $model->whereUserId($this->user->id)
            ->where('start_at', '>=', Carbon::now()->toDateTimeString())
            ->with(['routes',
                'vehicle' => function($query) {
                    $query->withTrashed();
                },
                'bookings' => function ($query) {
                    $query->where('status', Booking::STATUS_PENDING);
                }, ])
            ->orderBy('start_at', 'asc')
            ->latest('id');
    }
}
