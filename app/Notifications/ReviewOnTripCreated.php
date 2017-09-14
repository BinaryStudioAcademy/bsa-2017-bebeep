<?php

namespace App\Notifications;

use App\Models\Trip;
use App\Models\Review;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use App\Transformers\Notifications\TripTransformer;
use App\Transformers\Notifications\ReviewTransformer;
use Illuminate\Notifications\Messages\BroadcastMessage;

class ReviewOnTripCreated extends Notification implements ShouldQueue
{
    use Queueable;
    /**
     * @var Review
     */
    private $review;
    /**
     * @var Trip
     */
    private $trip;

    /**
     * Create a new notification instance.
     *
     * @param Review $review
     * @param Trip $trip
     */
    public function __construct(Review $review, Trip $trip)
    {
        $this->review = $review;
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
        return ['mail', 'database', 'broadcast'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->markdown('emails.review-on-trip-created', [
                'from' => $this->toArray($notifiable)['trip']['from'],
                'to' => $this->toArray($notifiable)['trip']['to'],
            ]);
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'data' => $this->toArray($notifiable),
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
        $review = fractal()->item($this->review, new ReviewTransformer())->toArray();
        $trip = fractal()->item($this->trip, new TripTransformer())->toArray();

        return [
            'review' => $review['data'],
            'trip' => $trip['data'],
        ];
    }
}
