<?php

namespace App\Notifications\Subscriptions;

use Carbon\Carbon;
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
        return ['mail'];
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
                'from' => $trip['from'],
                'to' => $trip['to'],
                'start_at' => Carbon::createFromTimestamp($trip['start_at'])->format('d.m.Y H:i'),
                'params' => [
                    'luggage_size' => $trip['params']['luggage_size'],
                    'seats' => $trip['params']['seats'],
                    'animals' => $trip['params']['animals']
                        ? __('email.subscription.yes')
                        : __('email.subscription.not'),
                    'price' => $trip['params']['price'],
                    'rating' => round($trip['params']['seats'], 2),
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
