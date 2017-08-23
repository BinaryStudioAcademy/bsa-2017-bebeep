<?php

namespace App\Repositories\Helpers;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;

class SearchResult
{
    const DISTANCE_TO = 10;
    const DISTANCE_FROM = 10;
    const EARTH_RADIUS_KM = 6371;

    /** @var Builder $query */
    protected $query;

    /** @var Carbon $dayFrom */
    protected $day;

    /** @var int $minHour */
    protected $minHour;

    /** @var int $maxHour */
    protected $maxHour;

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
        $this->day = Carbon::today();

        $this->minHour = 1;
        $this->maxHour = 24;

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
     * @return SearchResult
     */
    public function addLocation(float $fromLat, float $fromLng, float $toLat, float $toLng) : SearchResult
    {
        $this->query
            ->join('routes as routes_from', 'trips.id', '=', 'routes_from.trip_id')
            ->join('routes as routes_to', 'trips.id', '=', 'routes_to.trip_id')
            ->whereRaw($this->haversine('routes_from.from_lat', 'routes_from.from_lng', $fromLat, $fromLng) . ' < ' . self::DISTANCE_FROM)
            ->whereRaw($this->haversine('routes_to.to_lat', 'routes_to.to_lng', $toLat, $toLng) . ' < ' . self::DISTANCE_TO);

        return $this;
    }

    /**
     * @param Carbon $date
     * @return SearchResult
     */
    public function addDate(Carbon $date) : SearchResult
    {
        $this->day = clone $date;

        return $this;
    }

    /**
     * @param int $min
     * @param int $max
     * @return SearchResult
     */
    public function setHoursRange(int $min, int $max) : SearchResult
    {
        if ($min < 1) {
            throw new \InvalidArgumentException("Min hours can\'t be less than 1");
        }

        if ($max > 24) {
            throw new \InvalidArgumentException("Max hours can\'t be great than 24");
        }

        $this->minHour = $min;
        $this->maxHour = $max;

        return $this;
    }

    /**
     * @param int $min
     * @param int $max
     * @return SearchResult
     */
    public function setPrice(int $min, int $max) : SearchResult
    {
        $this->maxHour = $max;
        $this->minHour = $min;

        return $this;
    }

    /**
     * @param string $order
     * @param string $direction
     * @return SearchResult
     */
    public function setOrder(string $order, string $direction = 'asc') : SearchResult
    {
        $this->query->orderBy("trips.{$order}", $direction);

        return $this;
    }

    /**
     * @param int $limit
     * @param int $offset
     * @return SearchResult
     */
    public function paginate(int $limit, int $offset) : SearchResult
    {
        $this->limit = $limit;
        $this->offset = $offset;

        return $this;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function getResult()
    {
        $query = $this->makeResult()
            ->addSelect('trips.*')
            ->addSelect('routes_from.from as from')
            ->addSelect('routes_to.to as to');

        if ($this->minPrice !== 0 && $this->maxPrice !== 0) {
            $query->where('trips.price', '>=', $this->minPrice)
                ->where('trips.price', '<=', $this->maxPrice);
        }

        if ($this->limit !== 0) {
            $query->limit($this->limit)->offset($this->offset);
        }

        return $query->get();
    }

    /**
     * @return array
     */
    public function getMetaData() : array
    {
        $saveHours = [$this->minHour, $this->maxHour];

        $this->minHour = 1;
        $this->maxHour = 24;

        $query = $this->makeResult();

        $this->minHour = $saveHours[0];
        $this->maxHour = $saveHours[1];

        $result = $query->addSelect(DB::raw('MAX(trips.price) as max_price, MIN(trips.price) as min_price, COUNT(trips.id) as count'))
            ->first();
        if ($result === null) {
            return null;
        } else {
            return ['min' => $result->min_price, 'max' => $result->max_price, 'count' => $result->count];
        }
    }

    /**
     * @return Builder
     */
    private function makeResult() : Builder
    {
        $fromDate = clone $this->day;
        $fromDate->hour = $this->minHour - 1;

        $toDate = clone $this->day;
        $toDate->hour = $this->maxHour;

        $query = clone $this->query;

        $query->where('trips.start_at', '>=', $fromDate)
            ->where('trips.start_at', '<', $toDate);

        return $query;
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
        return "ROUND(2 * ".self::EARTH_RADIUS_KM." * ASIN(SQRT( ".
            "POWER(SIN(RADIANS({$startLat} - {$endLat}) / 2), 2) + ".
            "COS(RADIANS({$startLat})) * COS(RADIANS($endLat)) * ".
            "POWER(SIN(RADIANS({$startLng} - $endLng) / 2), 2) ".
            ")), 1)";
    }
}