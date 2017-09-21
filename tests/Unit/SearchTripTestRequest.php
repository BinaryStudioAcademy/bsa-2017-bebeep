<?php

namespace Tests\Unit;

use Carbon\Carbon;
use App\Services\Requests\SearchTripRequest as SearchTripRequestContract;

class SearchTripRequest implements SearchTripRequestContract
{
    public $fromLat;
    public $fromLng;
    public $toLat;
    public $toLng;
    public $transfers = 1;
    public $startAt;
    public $minPrice = 0;
    public $maxPrice = 99999;

    /**
     * Latitude 'From' point.
     *
     * @return mixed
     */
    public function getFromLat(): float
    {
        return $this->fromLat;
    }

    /**
     * Longitude 'From' point.
     *
     * @return mixed
     */
    public function getFromLng(): float
    {
        return $this->fromLng;
    }

    /**
     * Latitude 'To' point.
     *
     * @return mixed
     */
    public function getToLat(): float
    {
        return $this->toLat;
    }

    /**
     * Longitude 'To' point.
     *
     * @return mixed
     */
    public function getToLng(): float
    {
        return $this->toLng;
    }

    /**
     * Date of start trip.
     *
     * @return Carbon
     */
    public function getStartAt(): Carbon
    {
        return $this->startAt ?? Carbon::now();
    }

    /**
     * Limit items of page.
     *
     * @return int
     */
    public function getLimit(): int
    {
        return 10;
    }

    /**
     * Page number.
     *
     * @return int
     */
    public function getPage(): int
    {
        return 1;
    }

    /**
     * Sort field.
     *
     * @return string
     */
    public function getSort(): string
    {
        return 'price';
    }

    /**
     * Sort order.
     *
     * @return string
     */
    public function getOrder(): string
    {
        return 'asc';
    }

    /**
     * Sort order ascending.
     *
     * @return bool
     */
    public function isAsc(): bool
    {
        // TODO: Implement isAsc() method.
    }

    /**
     * Sort order descending.
     *
     * @return bool
     */
    public function isDesc(): bool
    {
        // TODO: Implement isDesc() method.
    }

    /**
     * Get filter array.
     *
     * @return array
     */
    public function getFilter(): array
    {
        // TODO: Implement getFilter() method.
    }

    /**
     * @return int
     */
    public function getMinTime(): int
    {
        return 0;
    }

    /**
     * @return int
     */
    public function getMaxTime(): int
    {
        return 24;
    }

    /**
     * @return int
     */
    public function getMinPrice(): int
    {
        return $this->minPrice;
    }

    /**
     * @return int
     */
    public function getMaxPrice(): int
    {
        return $this->maxPrice;
    }

    public function getIsAnimalsAllowed(): ?bool
    {
        return true;
    }

    public function getLuggageSize(): ?int
    {
        return null;
    }

    public function getSeats(): ?int
    {
        return null;
    }

    public function getRating(): ?int
    {
        return null;
    }

    public function getTransfers(): ?int
    {
        return $this->transfers;
    }

    public function getCurrencyId(): int
    {
        return 1;
    }
}
