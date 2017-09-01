<?php

namespace App\Providers;

use App\Events\BookingCreated;
use App\Events\UserRegistered;
use App\Events\BookingApproved;
use App\Events\BookingDeclined;
use App\Events\ApprovedBookingCanceled;
use App\Listeners\SendVerificationEmail;
use App\Listeners\SendBookingCreatedEmailToDriver;
use App\Listeners\SendBookingCanceledEmailToDriver;
use App\Listeners\SendBookingApprovedEmailToPassenger;
use App\Listeners\SendBookingDeclinedEmailToPassenger;
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
            SendBookingCreatedEmailToDriver::class,
        ],
        BookingDeclined::class => [
            SendBookingDeclinedEmailToPassenger::class,
        ],
        BookingApproved::class => [
            SendBookingApprovedEmailToPassenger::class,
        ],
        ApprovedBookingCanceled::class => [
            SendBookingCanceledEmailToDriver::class,
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
