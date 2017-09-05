<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Subscription extends Model
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'start_at',
        'from',
        'from_lat',
        'from_lng',
        'to',
        'to_lat',
        'to_lng',
        'email',
        'is_active',
    ];

    /**
     * @var array
     */
    protected $dates = [
        'start_at',
        'created_at',
        'updated_at',
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
        'is_active' => 'boolean',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function trips()
    {
        return $this->hasMany(Trip::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function filters()
    {
        return $this->belongsToMany(Filter::class);
    }
}
