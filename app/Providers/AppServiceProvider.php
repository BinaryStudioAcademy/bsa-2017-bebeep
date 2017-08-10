<?php

namespace App\Providers;

use App\Models\Vehicle;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->extendValidator();
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    private function extendValidator()
    {
        Validator::extend('role', function ($attribute, $value, $parameters, $validator) {
            if (! $parameters || ! Auth::user()) {
                return false;
            }

            return (bool)((int)Auth::user()->permissions & (int)$parameters[0]);
        });

        Validator::extend('max_seats_from_vehicle', function ($attribute, $value, $parameters, $validator) {
            if (! $parameters || ! Auth::user() || ! $parameters[0]) {
                return false;
            }

            $vehicle = Vehicle::whereId($parameters[0])->first();

            if (! $vehicle) {
                return false;
            }

            return $vehicle->seats > (int)$value;
        });

        Validator::extend('greater_than_date', function ($attribute, $value, $parameters, $validator) {
            if (! $parameters || ! $parameters[0]) {
                return false;
            }

            return (int)$parameters[0] < (int)$value;
        });
    }
}
