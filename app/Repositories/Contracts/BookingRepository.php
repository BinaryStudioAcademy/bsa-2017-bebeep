<?php

namespace App\Repositories\Contracts;

use App\User;
use App\Models\Trip;
use App\Models\Booking;
use Prettus\Repository\Contracts\RepositoryInterface;

interface BookingRepository extends RepositoryInterface
{
    public function save(Booking $booking) : Booking;

    public function getTripNotDeclinedBookingsCountForUser(Trip $trip, User $user) : int;
}
