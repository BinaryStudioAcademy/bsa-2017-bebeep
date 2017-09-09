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

    public function getWaypoints(): array;

    public function getVehicle(): array;

    public function getLuggageSize(): int;

    public function getIsAnimalsAllowed(): bool;

    public function getIsInBothDirections(): bool;

    public function getReverseStartAt(): Carbon;
}
