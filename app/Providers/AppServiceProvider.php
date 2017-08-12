<?php

namespace App\Providers;

use App\Models\Vehicle;
use Illuminate\Support\Facades\Auth;
use App\Services\Contracts\PasswordService as PasswordServiceContract;
use App\Services\PasswordService;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;

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
        $this->app->bind(PasswordServiceContract::class, PasswordService::class);
    }

    private function extendValidator()
    {
        Validator::extend('max_seats_from_vehicle', function ($attribute, $value, $parameters, $validator) {
            if (! $parameters || ! Auth::user() || ! $parameters[0]) {
                return false;
            }

            $vehicle = Vehicle::whereId($parameters[0])->first();

            if (! $vehicle) {
                return false;
            }

            return $vehicle->seats > (int) $value;
        });

        Validator::extend('greater_than_date', function ($attribute, $value, $parameters, $validator) {
            if (! $parameters || ! $parameters[0]) {
                return false;
            }

            return (int) $parameters[0] < (int) $value;
        });
    }
}
