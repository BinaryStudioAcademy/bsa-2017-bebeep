<?php

namespace App\Services\Requests;

interface CreateBookingRequest
{
    public function getSeats(): int;

    public function getRoutes(): array;
}
