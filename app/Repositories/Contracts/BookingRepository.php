<?php

namespace App\Repositories\Contracts;

use App\Models\Booking;
use Prettus\Repository\Contracts\RepositoryInterface;

/**
 * Interface BookingRepository
 * @package namespace App\Repositories;
 */
interface BookingRepository extends RepositoryInterface
{
    public function save(Booking $booking) : Booking;
}
