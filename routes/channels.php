<?php

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('general', function ($user) {
    if (Auth::check()) {
        return [
            'id' => $user->id,
            'last_name' => $user->last_name,
            'first_name' => $user->first_name,
        ];
    }

    return null;
});
