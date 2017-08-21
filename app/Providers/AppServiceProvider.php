<?php

namespace App\Providers;

use App\Models\Vehicle;
use App\Services\BookingService;
use App\Services\RouteService;
use App\Services\PasswordService;
use App\Services\UserProfileService;
use Illuminate\Support\Facades\Auth;
use App\Repositories\BookingRepository;
use App\Rules\DeleteTrip\TripOwnerRule;
use App\Validators\DeleteTripValidator;
use App\Validators\UpdateTripValidator;
use Illuminate\Support\ServiceProvider;
use App\Validators\RestoreTripValidator;
use Illuminate\Support\Facades\Validator;
use App\Validators\CanUncheckRoleValidator;
use App\Validators\IsPasswordCurrentValidator;
use App\Rules\UpdateTrip\TripOwnerRule as TripUpdateOwnerRule;
use App\Services\Contracts\RouteService as RouteServiceContract;
use App\Services\Contracts\PasswordService as PasswordServiceContract;
use App\Services\Contracts\UserProfileService as UserProfileServiceContract;

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
        $this->app->bind(UserProfileServiceContract::class, UserProfileService::class);

        $this->app->bind(DeleteTripValidator::class, function ($app) {
            return new DeleteTripValidator(new TripOwnerRule);
        });

        $this->app->bind(RestoreTripValidator::class, function ($app) {
            return new RestoreTripValidator(new TripOwnerRule);
        });

        $this->app->bind(UpdateTripValidator::class, function ($app) {
            return new UpdateTripValidator(new TripUpdateOwnerRule);
        });

        $this->app->bind(\App\Services\Contracts\BookingService::class, \App\Services\BookingService::class);

        $this->app->bind(\App\Repositories\Contracts\BookingRepository::class, \App\Repositories\BookingRepository::class);
        $this->app->bind(RouteServiceContract::class, RouteService::class);
        $this->app->bind(\App\Services\Contracts\TripDetailService::class, \App\Services\TripDetailService::class);
    }

    /**
     * Extend the validator with custom rules.
     *
     * @return void
     */
    private function extendValidator(): void
    {
        Validator::extend('max_seats_from_vehicle', function (
            $attribute,
            $value,
            $parameters,
            $validator
        ) {
            if (!$parameters || !Auth::user() || !$parameters[0]) {
                return false;
            }

            $vehicle = Vehicle::whereId($parameters[0])->first();

            if (!$vehicle) {
                return false;
            }

            return $vehicle->seats > (int)$value;
        });

        Validator::extend('greater_than_date', function (
            $attribute,
            $value,
            $parameters,
            $validator
        ) {
            if (!$parameters || !$parameters[0]) {
                return false;
            }

            return (int)$parameters[0] < (int)$value;
        });

        Validator::extend(
            'role_can_uncheck',
            CanUncheckRoleValidator::class,
            CanUncheckRoleValidator::ERROR_MSG
        );

        Validator::extend(
            'is_password_current',
            IsPasswordCurrentValidator::class,
            IsPasswordCurrentValidator::ERROR_MSG
        );
    }
}
