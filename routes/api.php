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

Route::group(['prefix' => 'trip', 'as' => 'trip'], function () {
   Route::post('create', ['as' => 'create', 'uses' => 'Api\Trip\TripApiController@create']);
   Route::put('update', ['as' => 'update', 'uses' => 'Api\Trip\TripApiController@update']);
   Route::delete('delete', ['as' => 'delete', 'uses' => 'Api\Trip\TripApiController@delete']);
});