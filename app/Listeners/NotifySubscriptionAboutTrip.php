<?php

namespace App\Listeners;

use App\Events\TripCreated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Notification;
use App\Services\Contracts\SubscriptionService;
use App\Notifications\Subscriptions\TripCreated as NotificationTripCreated;

class NotifySubscriptionAboutTrip implements ShouldQueue
{
    use InteractsWithQueue;

    /**
     * @var SubscriptionService
     */
    private $subscriptionService;

    public function __construct(SubscriptionService $subscriptionService)
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
