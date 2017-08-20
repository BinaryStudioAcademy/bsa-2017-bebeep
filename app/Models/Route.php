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
        'from_lat',
        'from_lng',
        'to',
        'to_lat',
        'to_lng',
        'trip_id',
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
}
