<?php

namespace App\Services\Requests;

use Carbon\Carbon;

interface CreateTripRequest
{
    public function getPrice(): float;

    public function getSeats(): int;

    public function getStartAt(): Carbon;

    public function getEndAt(): Carbon;

    public function getVehicleId(): int;

    public function getFrom(): array;

    public function getTo(): array;
}
