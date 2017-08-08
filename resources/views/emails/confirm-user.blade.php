Hi, {{ $user->last_name  }} {{ $user->first_name  }}! You're registered at the service BeBeep, please verify email:
{{ route('user.verify', ['email' => $user->email, 'token' => $user->verification_token]) }}
Your confirmation code: {{ $user->verification_token }}