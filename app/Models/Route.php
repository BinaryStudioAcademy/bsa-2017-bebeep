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
        $seatsReserved = 0;

        if ($this->bookings->count() <= 0) {
            return $this->trip->seats;
        }

        foreach ($this->bookings as $booking) {
            if ($booking->status !== Booking::STATUS_APPROVED) {
                continue;
            }

            $seatsReserved += $booking->seats;
        }

        return $this->trip->seats - $seatsReserved;
    }
}
