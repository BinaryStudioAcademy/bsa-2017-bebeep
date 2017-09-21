<?php

namespace App\Services\Requests;

use Carbon\Carbon;

interface UpdateTripRequest
{
    /**
     * @return float
     */
    public function getPrice(): float;

    /**
     * @return int|null
     */
    public function getCurrencyId(): ?int;

    /**
     * @return int
     */
    public function getSeats(): int;

    /**
     * @return Carbon
     */
    public function getStartAt(): Carbon;

    /**
     * @return Carbon
     */
    public function getEndAt(): Carbon;

    /**
     * @return int
     */
    public function getVehicleId(): int;

    /**
     * @return array
     */
    public function getFrom(): array;

    /**
     * @return array
     */
    public function getTo(): array;

    /**
     * @return array
     */
    public function getWaypoints(): array;

    // TODO :: Need to change this code so that
    // this method returns the collection of Waypoints instances

    /**
     * @return array
     */
    public function getRoutesTime(): array;

    // TODO :: Need to change this code so that
    // this method returns the collection of Routes instances

    /**
     * @return int
     */
    public function getLuggageSize(): int;

    /**
     * @return bool
     */
    public function getIsAnimalsAllowed(): bool;
}
