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
     * @return SearchFilter
     */
    public function addLocation(float $fromLat, float $fromLng, float $toLat, float $toLng): SearchFilter
    {
        $this->query
            ->join('routes as routes_from', 'trips.id', '=', 'routes_from.trip_id')
            ->join('routes as routes_to', 'trips.id', '=', 'routes_to.trip_id')
            ->whereRaw($this->haversine('routes_from.from_lat', 'routes_from.from_lng', $fromLat,
                    $fromLng).' < '.self::DISTANCE_FROM)
            ->whereRaw($this->haversine('routes_to.to_lat', 'routes_to.to_lng', $toLat,
                    $toLng).' < '.self::DISTANCE_TO);

        return $this;
    }

    public function addCurrency(): SearchFilter
    {
        $this->query
            ->join('currencies as currencies', 'trips.currency_id', '=', 'currencies.id');

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
     * @return SearchFilter
     */
    public function addDate(Carbon $date, $minHourOffset = 1, $maxHourOffset = 1): SearchFilter
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
     * @return SearchFilter
     */
    public function setPrice(int $min, int $max): SearchFilter
    {
        $this->maxPrice = $max;
        $this->minPrice = $min;

        return $this;
    }

    /**
     * @param string $order
     * @param string $direction
     * @return SearchFilter
     */
    public function setOrder(string $order, string $direction = 'asc'): SearchFilter
    {
        $this->query->orderBy("trips.{$order}", $direction);

        return $this;
    }

    /**
     * @param bool|null $isAnimalsAllowed
     * @return SearchFilter
     */
    public function setIsAnimalsAllowed(?bool $isAnimalsAllowed): SearchFilter
    {
        if ($isAnimalsAllowed === null) {
            return $this;
        }

        $this->query->where('trips.is_animals_allowed', $isAnimalsAllowed);

        return $this;
    }

    /**
     * @param int|null $luggageSize
     * @return SearchFilter
     */
    public function setLuggageSize(?int $luggageSize): SearchFilter
    {
        if ($luggageSize === null) {
            return $this;
        }

        $this->query->where('trips.luggage_size', $luggageSize);

        return $this;
    }

    /**
     * @param int|null $seats
     * @return SearchFilter
     */
    public function setSeats(?int $seats): SearchFilter
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
     * @return SearchFilter
     */
    public function setRating(?int $rating): SearchFilter
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
     * @param int $limit
     * @param int $offset
     * @return SearchFilter
     * @throws InvalidArgumentException
     */
    public function paginate(int $limit, int $offset): SearchFilter
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
            ->addSelect('currencies.rate')
            ->addSelect('routes_from.id as from_id')
            ->addSelect('routes_from.from as from')
            ->addSelect('routes_to.id as to_id')
            ->addSelect('routes_to.to as to');

        if ($this->maxPrice !== 0) {
            $query->where(DB::raw('trips.price / currencies.rate'), '>=', $this->minPrice)
                ->where(DB::raw('trips.price / currencies.rate'), '<=', $this->maxPrice);
        }

        $query->limit($this->limit)->offset($this->offset * $this->limit);

        return $query->get();
    }

    /**
     * @return array
     */
    public function getMetaData(): array
    {
        $query = clone $this->query;

        $result = $query->addSelect(DB::raw('MAX(trips.price) as max_price, MIN(trips.price) as min_price'))
            ->first();

        if ($this->minPrice !== 0 && $this->maxPrice !== 0) {
            $query->where('trips.price', '>=', $this->minPrice)
                ->where('trips.price', '<=', $this->maxPrice);
        }
        $count = $query->count();

        if ($result === null) {
            return ['min' => 0, 'max' => 0, 'count' => 0];
        } else {
            return ['min' => $result->min_price, 'max' => $result->max_price, 'count' => $count];
        }
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
