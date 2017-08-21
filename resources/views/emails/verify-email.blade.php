@component('mail::message')
# {{ __("email/verify.hi")  }}

{{ __("email/verify.please_verify_email")  }}:

@component('mail::button', ['url' => url('/verification?email=' . $user->email . '&token=' . $user->verification_token)])
    {{ __("email/verify.verify")  }}
@endcomponent

{!! __("email/verify.thanks", ["name" => config('app.name')]) !!}
@endcomponent