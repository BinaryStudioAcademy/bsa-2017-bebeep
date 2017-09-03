<?php

namespace App\Providers;

use App\Events\BookingCreated;
use App\Events\UserRegistered;
use App\Events\BookingApproved;
use App\Events\BookingDeclined;
use App\Events\ApprovedBookingCanceled;
use App\Listeners\SendVerificationEmail;
use App\Listeners\NotifyDriverAboutBookingCreated;
use App\Listeners\NotifyDriverAboutCanceledBooking;
use App\Listeners\NotifyPassengerAboutApprovedBooking;
use App\Listeners\NotifyPassengerAboutDeclinedBooking;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        UserRegistered::class => [
            SendVerificationEmail::class,
        ],
        BookingCreated::class => [
            NotifyDriverAboutBookingCreated::class,
        ],
        BookingDeclined::class => [
            NotifyPassengerAboutDeclinedBooking::class,
        ],
        BookingApproved::class => [
            NotifyPassengerAboutApprovedBooking::class,
        ],
        ApprovedBookingCanceled::class => [
            NotifyDriverAboutCanceledBooking::class,
        ],
        'App\Events\Event' => [
            'App\Listeners\EventListener',
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
