<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', function (){
    return view('home');
});

$app->post('funcionario/cadastrar', ['uses' => 'FuncionarioController@cadastrar', 'as' => 'funcionario.cadastrar']);
$app->post('funcionario/atualizar', ['uses' => 'FuncionarioController@atualizar', 'as' => 'funcionario.cadastrar']);
$app->delete('funcionario/excluir/{id}', ['uses' => 'FuncionarioController@apagar', 'as' => 'funcionario.apagar']);
$app->get('funcionario/listar', ['uses' => 'FuncionarioController@listar', 'as' => 'funcionario.listar']);