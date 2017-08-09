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

Route::group(['prefix' => 'car', 'as' => 'car'], function () {
    Route::post('create', ['as' => 'create', 'uses' => 'Api\\Car\\CarApiController@create']);
    Route::patch('update', ['as' => 'update', 'uses' => 'Api\\Car\\CarApiController@update']);
    Route::delete('delete', ['as' => 'delete', 'uses' => 'Api\\Car\\CarApiController@delete']);
});