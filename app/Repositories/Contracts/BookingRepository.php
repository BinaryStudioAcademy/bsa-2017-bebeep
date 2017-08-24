<?php

namespace App\Repositories\Contracts;

use App\User;
use App\Models\Trip;
use App\Models\Booking;
use Prettus\Repository\Contracts\RepositoryCriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

interface BookingRepository extends RepositoryInterface, RepositoryCriteriaInterface
{
    public function save(Booking $booking) : Booking;

    public function getTripNotDeclinedBookingsCountForUser(Trip $trip, User $user) : int;
}
