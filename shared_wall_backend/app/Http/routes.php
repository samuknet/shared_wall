<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

//Route::get('items/', function () {
//            echo "hello world";
//});


//Route::get('items', 'WallController@retrieveItems');


Route::resource('items', 'WallController@retrieveItems', ['only' => ['index', 'show', 'store', 'destroy']]);


Route::post('post','WallController@callback');

//Route::resource ();