<?php

namespace App\Providers;

use App\Models\Vehicle;
use App\Services\Helpers\Subscriptions\Filters\EndPriceFilter;
use App\Services\Helpers\Subscriptions\Filters\StartPriceFilter;
use App\Services\RouteService;
use App\Services\BookingService;
use App\Services\ReviewsService;
use App\Services\PasswordService;
use App\Rules\Booking\TripDateRule;
use App\Services\TripDetailService;
use App\Repositories\TripRepository;
use App\Services\UserProfileService;
use Illuminate\Support\Facades\Auth;
use App\Services\SubscriptionsService;
use App\Repositories\BookingRepository;
use App\Rules\DeleteTrip\TripOwnerRule;
use App\Validators\DeleteTripValidator;
use App\Validators\UpdateTripValidator;
use Illuminate\Support\ServiceProvider;
use App\Validators\RestoreTripValidator;
use Illuminate\Support\Facades\Validator;
use App\Rules\BookingConfirm\OwnerConfirm;
use App\Services\UserPublicProfileService;
use App\Validators\CancelBookingValidator;
use App\Validators\CreateBookingValidator;
use App\Validators\CanUncheckRoleValidator;
use App\Validators\ConfirmBookingValidator;
use App\Rules\Booking\TripRoutesHasSeatsRule;
use App\Validators\IsPasswordCurrentValidator;
use App\Rules\BookingConfirm\FutureTripConfirm;
use App\Rules\Booking\BookingTripNotExpiredRule;
use App\Rules\BookingConfirm\BookingTripConfirm;
use App\Validators\RoutesExistsForTripValidator;
use App\Rules\Booking\UserHasNotActiveBookingsForTrip;
use App\Services\Helpers\Subscriptions\FilterCollection;
use App\Services\Helpers\Subscriptions\Filters\SeatsFilter;
use App\Services\Helpers\Subscriptions\Filters\RatingFilter;
use App\Services\Helpers\Subscriptions\Filters\AnimalsFilter;
use App\Services\Helpers\Subscriptions\Filters\EndTimeFilter;
use App\Services\Helpers\Subscriptions\Filters\LuggageFilter;
use App\Rules\UpdateTrip\TripOwnerRule as TripUpdateOwnerRule;
use App\Services\Helpers\Subscriptions\Filters\StartTimeFilter;
use App\Services\Contracts\RouteService as RouteServiceContract;
use App\Services\Contracts\BookingService as BookingServiceContract;
use App\Services\Contracts\ReviewsService as ReviewsServiceContract;
use App\Services\Contracts\PasswordService as PasswordServiceContract;
use App\Repositories\Contracts\TripRepository as TripRepositoryContract;
use App\Services\Contracts\TripDetailService as TripDetailServiceContract;
use App\Services\Contracts\UserProfileService as UserProfileServiceContract;
use App\Repositories\Contracts\BookingRepository as BookingRepositoryContract;
use App\Services\Contracts\SubscriptionsService as SubscriptionsServiceContract;
use App\Services\Contracts\UserPublicProfileService as UserPublicProfileServiceContract;

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
        $this->app->bind(TripRepositoryContract::class, TripRepository::class);
        $this->app->bind(BookingRepositoryContract::class, BookingRepository::class);
        $this->app->bind(
            \App\Repositories\Contracts\SubscriptionRepository::class,
            \App\Repositories\SubscriptionRepository::class
        );

        $this->app->bind(RouteServiceContract::class, RouteService::class);
        $this->app->bind(BookingServiceContract::class, BookingService::class);
        $this->app->bind(ReviewsServiceContract::class, ReviewsService::class);
        $this->app->bind(PasswordServiceContract::class, PasswordService::class);
        $this->app->bind(TripDetailServiceContract::class, TripDetailService::class);
        $this->app->bind(UserProfileServiceContract::class, UserProfileService::class);
        $this->app->bind(SubscriptionsServiceContract::class, SubscriptionsService::class);
        $this->app->bind(UserPublicProfileServiceContract::class, UserPublicProfileService::class);
        $this->app->bind(
            \App\Services\Contracts\NotificationService::class,
            \App\Services\NotificationService::class
        );

        $this->app->bind(DeleteTripValidator::class, function ($app) {
            return new DeleteTripValidator(new TripOwnerRule);
        });

        $this->app->bind(RestoreTripValidator::class, function ($app) {
            return new RestoreTripValidator(new TripOwnerRule);
        });

        $this->app->bind(UpdateTripValidator::class, function ($app) {
            return new UpdateTripValidator(new TripUpdateOwnerRule);
        });

        $this->app->bind(ConfirmBookingValidator::class, function ($app) {
            return new ConfirmBookingValidator(
                new OwnerConfirm,
                new BookingTripConfirm,
                new FutureTripConfirm
            );
        });

        $this->app->bind(CancelBookingValidator::class, function ($app) {
            return new CancelBookingValidator(
                new BookingTripNotExpiredRule
            );
        });

        $this->app->bind(CreateBookingValidator::class, function ($app) {
            return new CreateBookingValidator(
                new TripDateRule,
                new TripRoutesHasSeatsRule,
                new UserHasNotActiveBookingsForTrip($app->make(BookingRepositoryContract::class))
            );
        });

        $this->app->bind(FilterCollection::class, function ($app) {
            return new FilterCollection(
                new StartTimeFilter(),
                new EndTimeFilter(),
                new AnimalsFilter(),
                new SeatsFilter(),
                new LuggageFilter(),
                new RatingFilter(),
                new StartPriceFilter(),
                new EndPriceFilter()
            );
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
            if (! $parameters || ! Auth::user()) {
                return false;
            }

            if (isset($parameters[1]) && (int) $parameters[1] >= (int) $value) {
                return true;
            }

            $vehicle = Vehicle::whereId($parameters[0])->first();

            if (! $vehicle) {
                return false;
            }

            return $vehicle->seats >= (int) $value;
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
            'routes_exists_for_trip',
            RoutesExistsForTripValidator::class,
            RoutesExistsForTripValidator::ERROR_MSG
        );

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
