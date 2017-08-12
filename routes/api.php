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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
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

    // TODO :: middleware - jwt.auth
    Route::get('profile', [
        'middleware' => 'jwt.guest',
        'as' => 'profile.show',
        'uses' => 'User\ProfileController@show',
    ]);

    // TODO :: middleware - jwt.auth
    Route::put('profile', [
        'middleware' => 'jwt.guest',
        'as' => 'profile.update',
        'uses' => 'User\ProfileController@update',
    ]);
});
