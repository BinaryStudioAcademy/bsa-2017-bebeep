@component('mail::message')
# Hi

You are receiving this email because we received a password reset request for your account.

@component('mail::button', ['url' => url('/password/reset?token=' . $token)])
    Reset Password
@endcomponent

If you did not request a password reset, no further action is required.

Thanks,<br>
{{ config('app.name') }}
@endcomponent