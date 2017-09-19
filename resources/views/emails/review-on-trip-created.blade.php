@component('mail::message')
# {{ __("email/verify.hi")  }}

{{ __("email/review.review_on_trip_header", ["from" => $from, "to" => $to]) }}

@component('mail::button', ['url' => url('/dashboard/profile/reviews/received')])
    {{ __("email/review.see_details")  }}
@endcomponent

{!! __("email/verify.thanks", ["name" => config('app.name')]) !!}
@endcomponent