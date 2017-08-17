<?php

namespace App\Listeners;

use Mail;
use App\Mail\VerifyEmail;
use App\Events\UserRegistered;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendVerificationEmail implements ShouldQueue
{
    /**
     * Handle the event.
     *
     * @param \App\Events\UserRegistered $event
     * @return void
     */
    public function handle(UserRegistered $event)
    {
        Mail::to($event->user)->send(new VerifyEmail($event->user));
    }
}
