<?php

namespace App\Listeners;

use App\Events\TripCreated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Notification;
use App\Services\Contracts\SubscriptionsService;
use App\Notifications\Subscriptions\TripCreated as NotificationTripCreated;

class NotifySubscriptionAboutTrip implements ShouldQueue
{
    use InteractsWithQueue;

    /**
     * @var SubscriptionsService
     */
    private $subscriptionService;

    public function __construct(SubscriptionsService $subscriptionService)
    {
        $this->subscriptionService = $subscriptionService;
    }

    /**
     * Handle the event.
     *
     * @param  TripCreated  $event
     * @return void
     */
    public function handle(TripCreated $event)
    {
        $subscriptions = $this->subscriptionService->getSubscriptionsByTrip($event->trip);

        Notification::send($subscriptions, new NotificationTripCreated($event->trip));
    }
}
