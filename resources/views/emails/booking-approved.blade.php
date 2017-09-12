@component('mail::message')
# {{ __("email/verify.hi")  }}

{{ __("email/booking.approved_header_part1") }} {{$from}} - {{$to}}{{ __("email/booking.approved_header_part2") }}
{{$date}}{{ __("email/booking.approved_header_part3") }}
@component('mail::button', ['url' => url('/trip/'.$trip_id)])
    {{ __("email/booking.see_details")  }}
@endcomponent

{!! __("email/verify.thanks", ["name" => config('app.name')]) !!}
@endcomponent