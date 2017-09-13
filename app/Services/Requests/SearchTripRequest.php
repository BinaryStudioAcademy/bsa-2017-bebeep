<?php

namespace App\Services\Requests;

use Carbon\Carbon;

interface SearchTripRequest
{
    public function getFromLat(): float;

    public function getFromLng(): float;

    public function getToLat(): float;

    public function getToLng(): float;

    public function getStartAt(): Carbon;

    public function getLimit(): int;

    public function getPage(): int;

    public function getSort(): string;

    public function getOrder(): string;

    public function isAsc(): bool;

    public function isDesc(): bool;

    public function getFilter(): array;

    public function getMinTime(): int;

    public function getMaxTime(): int;

    public function getMinPrice(): int;

    public function getMaxPrice(): int;

    public function getIsAnimalsAllowed(): ?bool;

    public function getLuggageSize(): ?int;

    public function getSeats(): ?int;

    public function getRating(): ?int;

    public function getTransfers(): ?int;
}
