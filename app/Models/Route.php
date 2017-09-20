<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Repositories\Helpers\SearchFilter;
use Money\Money;
use Money\Currency;

class Route extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'from',
        'from_lat',
        'from_lng',
        'to',
        'to_lat',
        'to_lng',
        'start_at',
        'end_at',
        'trip_id',
        'price',
    ];

    /**
     * @var array
     */
    protected $dates = [
        'start_at',
        'end_at',
    ];

    /**
     * @var array
     */
    protected $casts = [
        'from' => 'array',
        'from_lat' => 'float',
        'from_lng' => 'float',
        'to' => 'array',
        'to_lat' => 'float',
        'to_lng' => 'float',
        'price' => 'float',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function trip()
    {
        return $this->belongsTo(Trip::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function bookings()
    {
        return $this->belongsToMany(Booking::class);
    }

    /**
     * @return int
     */
    public function getReservedSeatsAttribute() : int
    {
        return $this->bookings->reject(function ($booking) {
            return $booking->status !== Booking::STATUS_APPROVED;
        })->reduce(function ($carry, $booking) {
            return $carry + $booking->seats;
        }, 0);
    }

    /**
     * @return int
     */
    public function getAvailableSeatsAttribute() : int
    {
        if ($this->bookings->count() <= 0) {
            return $this->trip->seats;
        }

        return $this->trip->seats - $this->reserved_seats;
    }

    /**
     * @return Money
     */
    public function moneyPrice()
    {
        $code = $this->trip->currency->code ?? 'USD';

        return new Money($this->attributes['price'], new Currency($code));
    }

    /**
     * @param \App\Models\Currency $currency
     * @return int
     */
    public function priceInCurrency(\App\Models\Currency $currency) : int
    {
        return (int) app('CurrenciesConverter')->convert($this->moneyPrice(), new Currency($currency->code))->getAmount();
    }

    /**
     * @param $query
     * @param $startLat
     * @param $startLng
     * @param $endLat
     * @param $endLng
     * @param int $distance
     * @return mixed
     */
    public function scopeHaversine($query, $startLat, $startLng, $endLat, $endLng, $distance = 20)
    {
        return $query->whereRaw(
            'ROUND(2 * '.SearchFilter::EARTH_RADIUS_KM.' * ASIN(SQRT( '.
            "POWER(SIN(RADIANS({$startLat} - {$endLat}) / 2), 2) + ".
            "COS(RADIANS({$startLat})) * COS(RADIANS($endLat)) * ".
            "POWER(SIN(RADIANS({$startLng} - $endLng) / 2), 2) ".
            ')), 1) < '.$distance
        );
    }
}
