<?php

namespace App\Notifications;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class BookingCreated extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * @var Booking
     */
    private $booking;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Booking $booking)
    {
        $this->booking = $booking;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail', 'database'];
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
            ->markdown('emails.booking-created')
            ->subject(
                'Created booking for trip: '.
                $this->toArray($notifiable)['routes']['from'].
                ' - '.
                $this->toArray($notifiable)['routes']['to']
            );
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        $from = $this->booking->routes->first()->from;
        $to = $this->booking->routes->last()->to;

        return [
            'booking' => [
                'id' => $this->booking->id,
                'seats' => $this->booking->seats,
            ],
            'user' => [
                'first_name' => $this->booking->user->first_name,
                'last_name' => $this->booking->user->last_name,
            ],
            'trip' => [
                'trip_id' => $this->booking->trip->id,
                'start_at' => $this->booking->trip->start_at->timestamp,
            ],
            'routes' => [
                'from' => array_reduce(
                    $from['address_components'],
                    function ($address, $component) {
                        return in_array('locality', $component['types'])
                            ? $component['short_name']
                            : $address;
                    },
                    $from['formatted_address']
                ),
                'to' => array_reduce(
                    $to['address_components'],
                    function ($address, $component) {
                        return in_array('locality', $component['types'])
                            ? $component['short_name']
                            : $address;
                    },
                    $to['formatted_address']
                ),
            ]
        ];
    }
}
