<?php

namespace App\Repositories\Helpers;

use Carbon\Carbon;
use App\Models\Trip;
use InvalidArgumentException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;

class SearchFilter
{
    const DISTANCE_TO = 20;
    const DISTANCE_FROM = 20;
    const EARTH_RADIUS_KM = 6371;

    /** @var Builder $query */
    protected $query;

    /** @var int $minPrice */
    protected $minPrice;

    /** @var int $maxPrice */
    protected $maxPrice;

    /** @var int $limit */
    protected $limit;

    /** @var int $offset */
    protected $offset;

    /** @var int $count */
    protected $count;

    /** @var int $metaPrice */
    protected $metaMinPrice;

    /** @var int $metaMaxPrice */
    protected $metaMaxPrice;

    public function __construct()
    {
        $this->query = DB::table('trips');

        $this->minPrice = 0;
        $this->maxPrice = 0;

        $this->limit = 10;
        $this->offset = 0;
    }

    /**
     * @param float $fromLat
     * @param float $fromLng
     * @param float $toLat
     * @param float $toLng
     *
     * @return $this
     */
    public function addLocation(
        float $fromLat,
        float $fromLng,
        float $toLat,
        float $toLng
    ): self {
        $this->query
            ->join('routes as routes_from', 'trips.id', '=', 'routes_from.trip_id')
            ->join('routes as routes_to', 'trips.id', '=', 'routes_to.trip_id')
            ->whereRaw($this->haversine('routes_from.from_lat', 'routes_from.from_lng', $fromLat,
                    $fromLng).' < '.self::DISTANCE_FROM)
            ->whereRaw($this->haversine('routes_to.to_lat', 'routes_to.to_lng', $toLat,
                    $toLng).' < '.self::DISTANCE_TO);

        return $this;
    }

    /**
     * @return $this
     */
    public function initialize()
    {
        $this->query
            ->join('routes as routes_from', 'trips.id', '=', 'routes_from.trip_id')
            ->join('routes as routes_to', 'trips.id', '=', 'routes_to.trip_id');

        return $this;
    }

    /**
     * @param Carbon $date
     * @param int $minHourOffset
     * @param int $maxHourOffset
     *
     * @return $this
     */
    public function addDate(Carbon $date, $minHourOffset = 1, $maxHourOffset = 1): self
    {
        $dayStart = clone $date;
        $dayStart->hour += $minHourOffset > 0 && $minHourOffset < $maxHourOffset ? $minHourOffset - 1 : 0;

        $dayEnd = clone $date;
        $dayEnd->hour += $maxHourOffset < 25 && $minHourOffset < $maxHourOffset ? $maxHourOffset : 24;

        if ($dayStart->timestamp < Carbon::now()->timestamp) {
            $dayStart = Carbon::now();
        }

        $this->query->where('trips.start_at', '>=', $dayStart)
            ->where('trips.start_at', '<=', $dayEnd);

        return $this;
    }

    /**
     * @param int $min
     * @param int $max
     *
     * @return $this
     */
    public function setPrice(int $min, int $max): self
    {
        $this->minPrice = $min;
        $this->maxPrice = $max;

        $this->metaMinPrice = $min;
        $this->metaMaxPrice = $max;

        return $this;
    }

    /**
     * @param string $order
     * @param string $direction
     *
     * @return $this
     */
    public function setOrder(string $order, string $direction = 'asc'): self
    {
        if ($order === 'price') {
            return $this;
        }

        $this->query->orderBy("trips.{$order}", $direction);

        return $this;
    }

    /**
     * @param bool|null $isAnimalsAllowed
     *
     * @return $this
     */
    public function setIsAnimalsAllowed(?bool $isAnimalsAllowed): self
    {
        if ($isAnimalsAllowed === null) {
            return $this;
        }

        $this->query->where('trips.is_animals_allowed', $isAnimalsAllowed);

        return $this;
    }

    /**
     * @param int|null $luggageSize
     *
     * @return $this
     */
    public function setLuggageSize(?int $luggageSize): self
    {
        if ($luggageSize === null) {
            return $this;
        }

        $this->query->where('trips.luggage_size', $luggageSize);

        return $this;
    }

    /**
     * @param int|null $seats
     *
     * @return $this
     */
    public function setSeats(?int $seats): self
    {
        if ($seats === null) {
            return $this;
        }

        $tripIds = Trip::select(['id', 'seats'])
            ->where('start_at', '>=', Carbon::now()->toDateTimeString())
            ->with([
                'routes' => function ($query) {
                    return $query->select(['id', 'trip_id'])->with('bookings');
                },
            ])->get()->filter(function ($trip) use ($seats) {
                $maxAvailableSeats = $trip->routes->map(function ($route) {
                    return $route->available_seats;
                })->max();

                if ($seats === 4) {
                    return $maxAvailableSeats >= 4;
                }

                return $maxAvailableSeats === $seats;
            })->pluck('id');

        $this->query->whereIn('trips.id', $tripIds);

        return $this;
    }

    /**
     * @param int|null $rating
     *
     * @return $this
     */
    public function setRating(?int $rating): self
    {
        if ($rating === null) {
            return $this;
        }

        $userIds = \App\User::select(['id'])->with([
            'receivedReviews' => function ($query) {
                return $query->select(
                    DB::raw('driver_id'),
                    DB::raw('COUNT(*) as reviews_count'),
                    DB::raw('SUM(mark) as reviews_total')
                )->groupBy('driver_id');
            },
        ])->get()->filter(function ($user) use ($rating) {
            if ($user->receivedReviews->count() <= 0) {
                return false;
            }

            $driverRating = $user->receivedReviews->first()->reviews_total / $user->receivedReviews->first()->reviews_count;

            if ($rating == 5) {
                return $driverRating >= 5;
            }

            return $driverRating >= $rating && $driverRating < $rating + 1;
        })->pluck('id');

        $this->query->whereIn('trips.user_id', $userIds);

        return $this;
    }

    /**
     * Set the search data count.
     *
     * @param int $count
     *
     * @return void
     */
    public function setCount(int $count): void
    {
        $this->count = $count;
    }

    /**
     * Check, whether the price is included in the min / max range.
     *
     * @param int $price
     *
     * @return bool
     */
    public function priceIsIncludedInRange(int $price): bool
    {
        return ($this->minPrice === 0 || $price >= $this->minPrice) &&
            ($this->maxPrice === 0 || $price <= $this->maxPrice);
    }

    /**
     * Change the min and the max price for the meta data.
     *
     * @param int $price
     *
     * @return void
     */
    public function changePriceRangeForMeta(int $price): void
    {
        if ($this->metaMinPrice === 0 || $price < $this->metaMinPrice) {
            $this->metaMinPrice = $price;
        }
        if ($this->metaMaxPrice === 0 || $price > $this->metaMaxPrice) {
            $this->metaMaxPrice = $price;
        }
    }

    /**
     * @param int $limit
     * @param int $offset
     *
     * @return $this
     *
     * @throws InvalidArgumentException
     */
    public function paginate(int $limit, int $offset): self
    {
        if ($limit < 0) {
            throw new InvalidArgumentException("Limit can't be a negative");
        }
        if ($offset < 0) {
            throw new InvalidArgumentException("Offset can't be a negative");
        }

        $this->limit = $limit;
        $this->offset = $offset;

        return $this;
    }

    /**
     * @return Collection
     */
    public function getResult(): Collection
    {
        $query = (clone $this->query)
            ->addSelect('trips.*')
            ->addSelect('routes_from.id as from_id')
            ->addSelect('routes_from.from as from')
            ->addSelect('routes_to.id as to_id')
            ->addSelect('routes_to.to as to');

        $query->limit($this->limit)->offset($this->offset * $this->limit);

        return $query->get();
    }

    /**
     * @return array
     */
    public function getMetaData(): array
    {
        return [
            'min' => $this->metaMinPrice,
            'max' => $this->metaMaxPrice,
            'count' => $this->count,
        ];
    }

    /**
     * Calculate the distance between two points.
     *
     * @param string $startLat
     * @param string $startLng
     * @param float $endLat
     * @param float $endLng
     * @return string
     */
    private function haversine(string $startLat, string $startLng, float $endLat, float $endLng): string
    {
        return 'ROUND(2 * '.self::EARTH_RADIUS_KM.' * ASIN(SQRT( '.
            "POWER(SIN(RADIANS({$startLat} - {$endLat}) / 2), 2) + ".
            "COS(RADIANS({$startLat})) * COS(RADIANS($endLat)) * ".
            "POWER(SIN(RADIANS({$startLng} - $endLng) / 2), 2) ".
            ')), 1)';
    }
}
