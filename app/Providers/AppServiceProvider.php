<?php

namespace App\Providers;

use Auth;
use Validator;
use App\Models\Vehicle;
use App\Services\{
    PasswordService,
    UserProfileService
};
use App\Validators\{
    DeleteTripValidator,
    CanUncheckRoleValidator
};
use App\Services\Contracts\{
    PasswordService as PasswordServiceContract,
    UserProfileService as UserProfileServiceContract
};
use App\Rules\DeleteTrip\TripOwnerRule;
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
        $this->app->bind(PasswordServiceContract::class, PasswordService::class);
        $this->app->bind(UserProfileServiceContract::class, UserProfileService::class);

        $this->app->bind(DeleteTripValidator::class, function ($app) {
            return new DeleteTripValidator(new TripOwnerRule);
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
            string $attribute,
            int $value,
            array $parameters,
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
            string $attribute,
            int $value,
            array $parameters,
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
    }
}
