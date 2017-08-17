<?php

use Illuminate\Http\Request;

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
        'uses' => 'Auth\LoginController@authorization'
    ]);

    Route::post('logout', [
        'as' => 'logout',
        'uses' => 'Auth\LoginController@logout'
    ]);

    Route::group(['prefix' => 'profile', 'as' => 'profile.'], function () {

        Route::get('/', [
            'middleware' => 'jwt.auth',
            'as' => 'show',
            'uses' => 'User\ProfileController@show',
        ]);

        Route::patch('/', [
            'middleware' => 'jwt.auth',
            'as' => 'update',
            'uses' => 'User\ProfileController@update',
        ]);

        Route::patch('password', [
            'middleware' => 'jwt.auth',
            'as' => 'password.update',
            'uses' => 'User\UpdatePasswordController@update',
        ]);

        Route::get('avatar', [
            'middleware' => 'jwt.auth',
            'as' => 'avatar.show',
            'uses' => 'User\AvatarController@show',
        ]);

        Route::patch('avatar', [
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
    'prefix' => 'v1/trips',
    'as' => 'trips.',
    'middleware' => ['jwt.auth', 'jwt.role:' . \App\User::DRIVER_PERMISSION],
], function () {
    Route::get('/', ['as' => 'all', 'uses' => 'TripsController@getAll']);
    Route::get('/upcoming', ['as' => 'upcoming', 'uses' => 'TripsController@getUpcoming']);
    Route::get('/past', ['as' => 'past', 'uses' => 'TripsController@getPast']);
    Route::post('/', ['as' => 'create', 'uses' => 'TripsController@create']);
    Route::get('show/{trip}', ['as' => 'show', 'uses' => 'TripsController@show']);
    Route::put('{trip}', ['as' => 'update', 'uses' => 'TripsController@update']);
    Route::delete('{trip}', ['as' => 'delete', 'uses' => 'TripsController@delete']);
    Route::delete('trash/{tripId}', ['as' => 'restore', 'uses' => 'TripsController@restore']);
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
