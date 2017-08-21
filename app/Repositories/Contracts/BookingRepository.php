<?php

namespace App\Repositories\Contracts;

use App\Models\Booking;
use Prettus\Repository\Contracts\RepositoryInterface;

interface BookingRepository extends RepositoryInterface
{
    public function save(Booking $booking) : Booking;
}
