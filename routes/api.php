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

    Route::post('register',
        ['middleware' => 'jwt.guest', 'as' => 'register', 'uses' => 'Auth\RegisterController@register']);
    Route::post('verify', ['middleware' => 'jwt.guest', 'as' => 'verify', 'uses' => 'Auth\RegisterController@verify']);
    Route::post('authorization', ['middleware' => 'jwt.guest', 'as' => 'authorization', 'uses' => 'Auth\LoginController@authorization']);
    Route::post('logout', ['as' => 'logout', 'uses' => 'Auth\LoginController@logout']);
});

Route::group(['middleware' => ['jwt.auth', 'jwt.role:'.\App\User::DRIVER_PERMISSION]], function () {
    Route::resource('v1/car', "Api\\Car\\CarController");
    Route::resource('v1/car-body', 'Api\\Car\\CarBodyController');
    Route::resource('v1/carColor',  'Api\\Car\\CarController@getCarColor');
    Route::resource('v1/carMark', 'Api\\Car\\CarController@getCarMark');
    Route::resource('v1/carModel/{idMark}', 'Api\\Car\\CarController@getCarModel');
});

Route::group([
    'prefix' => 'trips',
    'as' => 'trips.',
    'middleware' => ['jwt.auth', 'jwt.role:'.\App\User::DRIVER_PERMISSION],
], function () {
    Route::post('create', ['as' => 'create', 'uses' => 'TripsController@create']);
    Route::patch('update/{trip}', ['as' => 'update', 'uses' => 'TripsController@update']);
    Route::delete('{trip}', ['as' => 'delete', 'uses' => 'TripsController@delete']);
});

Route::middleware('jwt.guest')->post('v1/password-resets', ['as' => 'password.forgot', 'uses' => 'Auth\PasswordResetsController@forgot']);
Route::middleware('jwt.guest')->put('v1/password-resets', ['as' => 'password.reset', 'uses' => 'Auth\PasswordResetsController@reset']);


