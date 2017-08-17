<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Vehicle;
use App\Services\{
    PasswordService,
    UserProfileService
};
use App\Validators\{
    UpdateTripValidator,
    DeleteTripValidator,
    RestoreTripValidator,
    CanUncheckRoleValidator,
    IsPasswordCurrentValidator
};
use App\Services\Contracts\{
    PasswordService as PasswordServiceContract,
    UserProfileService as UserProfileServiceContract
};
use Illuminate\Support\ServiceProvider;
use App\Rules\DeleteTrip\TripOwnerRule;
use App\Rules\UpdateTrip\TripOwnerRule as TripUpdateOwnerRule;

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
            if (! $parameters || ! Auth::user() || ! $parameters[0]) {
                return false;
            }

            $vehicle = Vehicle::whereId($parameters[0])->first();

            if (! $vehicle) {
                return false;
            }

            return $vehicle->seats > (int) $value;
        });

        Validator::extend('greater_than_date', function (
            $attribute,
            $value,
            $parameters,
            $validator
        ) {
            if (! $parameters || ! $parameters[0]) {
                return false;
            }

            return (int) $parameters[0] < (int) $value;
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
