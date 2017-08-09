@component('mail::message')
# Hi

Please, verify your E-mail:

@component('mail::button', ['url' => url('/register/verify?email=' . $user->email . '&token=' . $user->verification_token)])
    Verify
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent