@component('mail::message')
# {{ __('email/subscription.hi')  }}

{{ __('email/subscription.about_trip', [
    'from' => $from,
    'to' => $to,
    'start_at' => $start_at
]) }}

@foreach ($params as $param => $value)
    {{ __('email/subscription.'.$param, ['value' => $value]) }}
@endforeach

@component('mail::button', ['url' => url('/trip/'.$trip_id)])
    {{ __('email/subscription.detail')  }}
@endcomponent

{!! __('email/subscription.thanks', ['name' => config('app.name')]) !!}
@endcomponent