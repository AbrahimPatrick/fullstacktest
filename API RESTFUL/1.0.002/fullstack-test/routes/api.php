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
Route::post('/cadastro','UserController@register');

Route::post('/postar','PostController@store');

Route::get('/posts','PostController@index');

Route::get('/listar','UserController@list');

Route::get('/posts/{id}','PostController@show');

Route::put('/posts/editar/{id}','PostController@update');

Route::group(['middleware' => ['auth:api']], function (){

});
