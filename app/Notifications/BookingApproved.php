<?php

namespace App\Notifications;

use Carbon\Carbon;
use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\App;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use App\Transformers\Notifications\BookingTransformer;
use Illuminate\Notifications\Messages\BroadcastMessage;

class BookingApproved extends Notification implements ShouldQueue
{
    use Queueable;
    /**
     * @var Booking
     */
    private $booking;
    private $monthRu = [1 => 'Января', 2 => 'Февраля', 3 => 'Марта', 4 => 'Апреля',
        5 => 'Мая', 6 => 'Июня', 7 => 'Июля', 8 => 'Августа',
        9 => 'Сентября', 10 => 'Октября', 11 => 'Ноября', 12 => 'Декабря', ];
    private $monthUa = [1 => 'Січня', 2 => 'Лютого', 3 => 'Березня', 4 => 'Квітня',
        5 => 'Травня', 6 => 'Червня', 7 => 'Липня', 8 => 'Серпня',
        9 => 'Вересня', 10 => 'Жовтня', 11 => 'Листопада', 12 => 'Грудня', ];

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
     * @param  mixed $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail', 'database', 'broadcast'];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'data' => $this->toArray($notifiable),
        ]);
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $data = $this->toArray($notifiable);
        $from = $data['routes']['from'];
        $to = $data['routes']['to'];

        return (new MailMessage)
            ->markdown('emails.booking-approved', [
                'trip_id' => $data['trip']['trip_id'],
                'date' => $this->getDate($notifiable),
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
     * @param  mixed $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return fractal()->item($this->booking, new BookingTransformer())->toArray()['data'];
    }

    /**
     * @param $notifiable
     * @return string
     */
    public function getDate($notifiable)
    {
        $data = $this->toArray($notifiable);

        switch (App::getLocale()) {
            case 'uk': {
                return $this->getMonthLocale($notifiable, $this->monthUa);
            }
                break;
            case 'ru': {
                return $this->getMonthLocale($notifiable, $this->monthRu);
            }
                break;
            case 'en': {
                $date = Carbon::createFromTimestampUTC($data['trip']['start_at'])->format('jS F Y');
                $time = Carbon::createFromTimestampUTC($data['trip']['start_at'])->format('g:ia');

                return $date.' at '.$time;
            }
                break;
        }
    }

    /**
     * @param array $month
     * @param int $numberMonth
     * @return string
     */
    private function getMonth(array $month, int $numberMonth): string
    {
        return $month[$numberMonth];
    }

    /**
     * @param $notifiable
     * @param array $localeMonth
     * @return string
     */
    private function getMonthLocale($notifiable, array $localeMonth)
    {
        $data = $this->toArray($notifiable);
        $numberMonth = Carbon::createFromTimestampUTC($data['trip']['start_at'])->month;
        $month = $this->getMonth($localeMonth, $numberMonth);

        return Carbon::createFromTimestampUTC($data['trip']['start_at'])->format('jго '.$month.' Y в H:i');
    }
}
