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
    Route::post('register', ['as' => 'register', 'uses' => 'Auth\RegisterController@register']);
    Route::post('verify', ['as' => 'verify', 'uses' => 'Auth\RegisterController@verify']);
});


Route::group(['middleware' => 'jwt.auth'], function () {
    Route::resource('v1/car', "Api\\Car\\CarController");
    Route::get('v1/carBody', ['uses' => 'Api\\Car\\CarController@getCarBody']);
});