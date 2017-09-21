<?php

namespace App\Notifications\Subscriptions;

use App\Models\Trip;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use App\Transformers\Notifications\SubscriptionTripTransformer;

class TripCreated extends Notification implements ShouldQueue
{
    use Queueable;
    /**
     * @var Trip
     */
    private $trip;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Trip $trip)
    {
        $this->trip = $trip;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return $notifiable->user
            ? ['mail', 'database', 'broadcast']
            : ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $trip = $this->toArray($notifiable);

        return (new MailMessage)
            ->markdown('emails.subscription-email', [
                'trip_id' => $trip['trip_id'],
                'from' => $trip['from'],
                'to' => $trip['to'],
                'start_at' => $trip['start_at']->toDateString(),
                'params' => [
                    'luggage_size' => __('email/subscription.luggage_size'.$trip['params']['luggage_size']),
                    'seats' => $trip['params']['seats'] < 4 ? $trip['params']['seats'] : __('email/subscription.more_four'),
                    'animals' => $trip['params']['animals']
                        ? __('email/subscription.yes')
                        : __('email/subscription.not'),
                    'price' => $trip['params']['price'],
                    'rating' => round($trip['params']['rating'], 2),
                ],
            ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return fractal()->item($this->trip, new SubscriptionTripTransformer())->toArray()['data'];
    }
}
