@component('mail::message')
# {{ __("email/verify.hi")  }}

{{ __("email/booking.canceled_header") }}

@component('mail::button', ['url' => url('/trips/upcoming')])
    {{ __("email/booking.see_details")  }}
@endcomponent

{!! __("email/verify.thanks", ["name" => config('app.name')]) !!}
@endcomponent