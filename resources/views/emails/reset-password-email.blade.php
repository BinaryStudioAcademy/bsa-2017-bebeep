@component('mail::message')
# {{__('email/reset-password.hi')}}

{{__('email/reset-password.you_are_receiving_this_email_beacause')}}

@component('mail::button', ['url' => url('/password/reset?token=' . $token)])
    {{__('email/reset-password.reset_password')}}
@endcomponent

{{__('email/reset-password.no_further_action')}}

{!! __('email/reset-password.thanks', ["name" => config('app.name')]) !!}
@endcomponent