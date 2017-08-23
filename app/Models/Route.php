<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Route extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'from',
        'to',
        'trip_id',
    ];

    /**
     * @var array
     */
    protected $casts = [
        'from' => 'array',
        'to' => 'array',
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
    public function getAvailableSeatsAttribute()
    {
        if ($this->bookings->count() <= 0) {
            return $this->trip->seats;
        }

        $seatsReserved = $this->bookings->reject(function ($booking) {
            return $booking->status !== Booking::STATUS_APPROVED;
        })->reduce(function ($carry, $booking) {
            return $carry + $booking->seats;
        }, 0);

        return $this->trip->seats - $seatsReserved;
    }
}
