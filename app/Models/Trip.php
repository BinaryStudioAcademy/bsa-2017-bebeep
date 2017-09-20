<?php

namespace App\Models;

use App\User;
use Money\Money;
use App\Models\Currency;
use Money\Currency as MoneyCurrency;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Trip extends Model
{
    use SoftDeletes;

    const MIN_DELAY_TO_START_DATE = 3600;
    const LUGGAGE_SIZE_BIG = 2;
    const LUGGAGE_SIZE_MEDIUM = 1;
    const LUGGAGE_SIZE_SMALL = 0;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'price',
        'currency_id',
        'seats',
        'start_at',
        'end_at',
        'vehicle_id',
        'user_id',
        'luggage_size',
        'is_animals_allowed',
    ];

    /**
     * @var array
     */
    protected $dates = [
        'deleted_at',
        'created_at',
        'updated_at',
        'start_at',
        'end_at',
    ];

    /**
     * @var array
     */
    protected $casts = [
        'is_animals_allowed' => 'boolean',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function routes()
    {
        return $this->hasMany(Route::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function subscriptions()
    {
        return $this->belongsToMany(Subscription::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    /**
     * @return \Money\Money
     */
    public function moneyPrice()
    {
        $code = $this->currency->code ?? Currency::CURRENCY_MAIN_CODE;

        return new Money($this->attributes['price'], new MoneyCurrency($code));
    }

    /**
     * @param \App\Models\Currency $currency
     *
     * @return int
     */
    public function priceInCurrency(Currency $currency) : int
    {
        return (int) app('CurrenciesConverter')->convert(
            $this->moneyPrice(),
            new MoneyCurrency($currency->code)
        )->getAmount();
    }
}
