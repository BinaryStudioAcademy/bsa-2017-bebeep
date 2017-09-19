@component('mail::message')
# {{ __("email/verify.hi")  }}

{{ __("email/booking.declined_header") }}

@component('mail::button', ['url' => url('/bookings')])
    {{ __("email/booking.see_details")  }}
@endcomponent

{!! __("email/verify.thanks", ["name" => config('app.name')]) !!}
@endcomponent