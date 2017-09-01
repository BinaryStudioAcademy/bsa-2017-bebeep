@component('mail::message')
# {{ __("email/verify.hi")  }}

{{ __("email/booking.approved_header") }}

@component('mail::button', ['url' => url('/')])
    {{ __("email/booking.see_details")  }}
@endcomponent

{!! __("email/verify.thanks", ["name" => config('app.name')]) !!}
@endcomponent