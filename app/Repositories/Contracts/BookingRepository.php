<?php

namespace App\Repositories\Contracts;

use App\User;
use App\Models\Trip;
use App\Models\Booking;
use Prettus\Repository\Contracts\RepositoryInterface;
use Prettus\Repository\Contracts\RepositoryCriteriaInterface;

interface BookingRepository extends RepositoryInterface, RepositoryCriteriaInterface
{
    public function save(Booking $booking) : Booking;

    public function getTripNotDeclinedBookingsCountForUser(Trip $trip, User $user) : int;
}
