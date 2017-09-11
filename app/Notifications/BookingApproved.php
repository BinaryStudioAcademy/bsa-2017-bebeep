<?php

namespace App\Notifications;

use Carbon\Carbon;
use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use App\Transformers\Notifications\BookingTransformer;

class BookingApproved extends Notification implements ShouldQueue
{
    use Queueable;
    /**
     * @var Booking
     */
    private $booking;

    /**
     * BookingApproved constructor.
     *
     * @param Booking $booking
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
        $data = $this->toArray($notifiable);
        $from = $data['routes']['from'];
        $to = $data['routes']['to'];

        return (new MailMessage)
            ->markdown('emails.booking-approved', [
                'trip_id' =>$data['trip']['trip_id'],
                'date' => Carbon::createFromTimestampUTC($data['trip']['start_at']),
                'from' => $from,
                'to' => $to,
            ])
            ->subject(__('Notifications/BookingApproved.mail_subject', [
                'from' => $from,
                'to' => $to,
            ]));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return fractal()->item($this->booking, new BookingTransformer())->toArray()['data'];
    }
}
