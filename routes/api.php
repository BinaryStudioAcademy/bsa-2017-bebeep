<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('authentication/me', [
    'middleware' => 'jwt.auth',
    'as' => 'authentication.me',
    'uses' => 'Auth\SessionController@getSessionUser',
]);

Route::group(['prefix' => 'driver', 'as' => 'driver.'], function () {
    Route::get('{user}/reviews', [
        'as' => 'reviews',
        'uses' => 'DriverController@getReviews',
    ]);

    Route::get('{user}/reviews-meta', [
        'as' => 'reviews-meta',
        'uses' => 'DriverController@getReviewsMetaData',
    ]);
});

Route::group(['prefix' => 'user', 'as' => 'user.'], function () {
    Route::post('register', [
        'middleware' => 'jwt.guest',
        'as' => 'register',
        'uses' => 'Auth\RegisterController@register',
    ]);

    Route::post('verify', [
        'middleware' => 'jwt.guest',
        'as' => 'verify',
        'uses' => 'Auth\RegisterController@verify',
    ]);

    Route::post('authorization', [
        'middleware' => 'jwt.guest',
        'as' => 'authorization',
        'uses' => 'Auth\LoginController@authorization',
    ]);

    Route::post('logout', [
        'as' => 'logout',
        'uses' => 'Auth\LoginController@logout',
    ]);

    Route::group(['prefix' => 'profile', 'as' => 'profile.'], function () {
        Route::get('/', [
            'middleware' => 'jwt.auth',
            'as' => 'show',
            'uses' => 'User\ProfileController@show',
        ]);

        Route::put('/', [
            'middleware' => 'jwt.auth',
            'as' => 'update',
            'uses' => 'User\ProfileController@update',
        ]);

        Route::put('password', [
            'middleware' => 'jwt.auth',
            'as' => 'password.update',
            'uses' => 'User\UpdatePasswordController@update',
        ]);

        Route::get('avatar', [
            'middleware' => 'jwt.auth',
            'as' => 'avatar.show',
            'uses' => 'User\AvatarController@show',
        ]);

        Route::put('avatar', [
            'middleware' => 'jwt.auth',
            'as' => 'avatar.update',
            'uses' => 'User\AvatarController@update',
        ]);

        Route::delete('avatar', [
            'middleware' => 'jwt.auth',
            'as' => 'avatar.delete',
            'uses' => 'User\AvatarController@destroy',
        ]);
    });
});

Route::group([
    'middleware' => ['jwt.auth', 'jwt.role:'.\App\User::DRIVER_PERMISSION],
], function () {
    Route::resource('v1/car', 'Api\\Car\\CarController');
});

Route::resource('v1/car-body', 'Api\\Car\\CarBodyController', ['only' => ['index']]);
Route::resource('v1/car-color', 'Api\\Car\\CarColorController', ['only' => ['index']]);
Route::resource('v1/car-brand', 'Api\\Car\\CarBrandController', ['only' => ['index']]);
Route::get('v1/car-brand/{carBrand}/models', 'Api\\Car\\CarBrandController@getModelByBrand');

Route::group([
    'prefix' => 'v1/trips',
    'as' => 'trips.',
    'middleware' => ['jwt.auth', 'jwt.role:'.\App\User::DRIVER_PERMISSION],
], function () {
    Route::get('/', ['as' => 'all', 'uses' => 'TripsController@getAll']);
    Route::get('/upcoming', ['as' => 'upcoming', 'uses' => 'TripsController@getUpcoming']);
    Route::get('/past', ['as' => 'past', 'uses' => 'TripsController@getPast']);
    Route::post('/', ['as' => 'create', 'uses' => 'TripsController@create']);
    Route::get('show/{trip}', ['as' => 'show', 'uses' => 'TripsController@show']);
    Route::put('{trip}', ['as' => 'update', 'uses' => 'TripsController@update']);
    Route::delete('{trip}', ['as' => 'delete', 'uses' => 'TripsController@delete']);

    Route::delete('trash/{tripId}', ['as' => 'restore', 'uses' => 'TripsController@restore']);

    Route::put('{trip}/bookings/{booking}/status', ['as' => 'booking.status', 'uses' => 'BookingsController@status']);
});

Route::group([
    'prefix' => 'v1/trips',
], function () {
    Route::get('/search', ['as' => 'trips.search', 'uses' => 'TripsController@search']);
    Route::get('/{trip}/detail', ['as' => 'trip.detail', 'uses' => 'TripsController@detail']);
});

Route::post('v1/trips/{trip}/bookings', ['as' => 'booking.create', 'uses' => 'BookingsController@create', 'middleware' => ['jwt.auth', 'jwt.role:'.\App\User::PASSENGER_PERMISSION]]);

Route::group([
    'prefix' => 'v1/bookings',
    'as' => 'booking.',
    'middleware' => ['jwt.auth', 'jwt.role:'.\App\User::PASSENGER_PERMISSION],
], function () {
    Route::get('/past', ['as' => 'past', 'uses' => 'BookingsController@past']);
    Route::get('/upcoming', ['as' => 'upcoming', 'uses' => 'BookingsController@upcoming']);
    Route::delete('/{booking}', ['as' => 'cancel', 'uses' => 'BookingsController@cancel']);
});

Route::post('v1/password-resets', [
    'middleware' => 'jwt.guest',
    'as' => 'password.forgot',
    'uses' => 'Auth\PasswordResetsController@forgot',
]);

Route::put('v1/password-resets', [
    'middleware' => 'jwt.guest',
    'as' => 'password.reset',
    'uses' => 'Auth\PasswordResetsController@reset',
]);

Route::get('v1/driver/{user}', [
    'as' => 'driver.profile',
    'uses' => 'User\PublicProfileController@showDriver',
]);

Route::get('v1/passenger/{user}', [
    'as' => 'passenger.profile',
    'uses' => 'User\PublicProfileController@showPassenger',
]);

Route::get('v1/reviews/given', [
    'middleware' => ['jwt.auth'],
    'as' => 'reviews.given',
    'uses' => 'ReviewsController@given',
]);
Route::get('v1/reviews/received', [
    'middleware' => ['jwt.auth'],
    'as' => 'reviews.received',
    'uses' => 'ReviewsController@received',
]);

Route::group([
    'prefix' => '/v1/notifications',
    'middleware' => ['jwt.auth'],
    'as' => 'notifications.',
], function () {
    Route::get('/', [
        'as' => 'index',
        'uses' => 'NotificationsController@index',
    ]);

    Route::put('/{databaseNotification}/status', [
        'read',
        'uses' => 'NotificationsController@changeStatus',
    ]);

    Route::get('/unread/count', [
        'unread',
        'uses' => 'NotificationsController@getUnread',
    ]);
});

Route::post('v1/reviews', [
    'middleware' => ['jwt.auth', 'jwt.role:'.\App\User::PASSENGER_PERMISSION],
    'as' => 'review.create',
    'uses' => 'ReviewsController@save',
]);

Route::group([
    'prefix' => 'v1/subscriptions',
    'middleware' => ['jwt.auth'],
    'as' => 'subscriptions.',
], function () {
    Route::get('/', [
        'as' => 'index',
        'uses' => 'Api\Subscription\SubscriptionsController@index',
    ]);
    Route::put('/{subscription}/status', [
        'middleware' => 'can:status,subscription',
        'as' => 'status',
        'uses' => 'Api\Subscription\SubscriptionsController@status',
    ]);
    Route::delete('/{subscription}', [
        'middleware' => 'can:delete,subscription',
        'as' => 'delete',
        'uses' => 'Api\Subscription\SubscriptionsController@delete',
    ]);
    Route::patch('/{subscription}', [
        'middleware' => 'can:edit,subscription',
        'as' => 'edit',
        'uses' => 'Api\Subscription\SubscriptionsController@edit',
    ]);
});

Route::resource('v1/subscription', 'Api\\Subscription\\SubscriptionsController', ['only' => ['store']]);

Route::post('v1/users/{user}/messages', [
    'middleware' => ['jwt.auth'],
    'as' => 'send.message',
    'uses' => 'Api\Chat\ChatController@message',
]);

Route::get('v1/users/others', [
    'as' => 'users',
    'uses' => 'Api\Chat\UserController@others',
]);
