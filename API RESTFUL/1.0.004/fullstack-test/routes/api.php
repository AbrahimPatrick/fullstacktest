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

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');

    Route::group([
        'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'AuthController@logout');
    });
});

Route::group([
    'prefix' => 'public'
], function () {
    Route::get('/post/{slug}','PostController@publicPost');
    Route::get('/posts/{tag?}','PostController@publicList');
});

Route::group(['middleware' => ['auth:api']], function (){
    Route::post('/cadastro','UserController@register');

    Route::get('/editar/{id}','UserController@edit');

    Route::put('/atualizar/{id}','UserController@update');

    Route::delete('/excluir/{id}','UserController@delete');

    Route::post('/postar','PostController@store');

    Route::get('/posts','PostController@index');

    Route::get('/listar','UserController@list');

    Route::get('/posts/{id}','PostController@show');

    Route::put('/post/editar/{id}','PostController@update');

    Route::put('/post/publicar/{id}','PostController@publish');

    Route::put('/post/despublicar/{id}','PostController@unpublish');

    Route::delete('/posts/{id}/tag/remover/{tag_id}','PostController@removeTag');

    Route::post('/posts/{id}/adicionar/tag','PostController@adicionaTag');

    Route::get('/tags','PostController@listarTags');
});
