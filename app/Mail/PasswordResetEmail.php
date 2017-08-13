<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordResetEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $token;

    /**
     * Create a new message instance.
     * @param string $token
     */
    public function __construct(string $token)
    {
        $this->token = $token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.reset-password-email')->subject('Reset password');
    }
}
