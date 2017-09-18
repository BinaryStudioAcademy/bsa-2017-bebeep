<?php

namespace App\Services\Requests;

use Carbon\Carbon;

interface CreateTripRequest
{
    /**
     * @return float
     */
    public function getPrice(): float;

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
    public function getVehicleId(): int;

    /**
     * @return array
     */
    public function getVehicle(): array;

    /**
     * @return int
     */
    public function getLuggageSize(): int;

    /**
     * @return bool
     */
    public function getIsAnimalsAllowed(): bool;

    /**
     * @return bool
     */
    public function getIsInBothDirections(): bool;

    /**
     * @return Carbon
     */
    public function getReverseStartAt(): Carbon;

    public function getRecurringCount(): int;

    public function getRecurringPeriod(): int;

    public function setReverseStartAt(Carbon $date): Carbon;

    public function setStartAt(Carbon $date): Carbon;

    public function setEndAt(Carbon $date): Carbon;
}
