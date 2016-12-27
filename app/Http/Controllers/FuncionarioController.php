<?php

namespace App\Http\Controllers;
use App\Funcionario as Funcionario;

class FuncionarioController extends Controller
{
    public function listar(){
        return Funcionario::all();
    }

    public function cadastrar(Request $request){
        $funcionario = Funcionario::create($request->all());
        if(isset($funcionario)){
            return ['status' => 'success', 'msg' => 'Funcionario cadastrado com sucesso.'];
        }else{
            return ['status' => 'error', 'msg' => 'Erro ao cadastrar funcionário.'];
        }
    }

    public function atualizar(Request $request){
        $id = $request->input('id');
        $funcionario = Funcionario::find($id);
        $funcionario->fill($request->all());
        if($funcionario->save()){
            return ['status' => 'success', 'msg' => 'Funcionario atualizado com sucesso.'];
        }else{
            return ['status' => 'error', 'msg' => 'Erro ao atualizar funcionário.'];
        }
    }

    public function apagar($id){
        $funcionario = Funcionario::find($id);
        if(isset($funcionario) && $funcionario->delete()){
            return ['status' => 'success', 'msg' => 'Funcionario excluído com sucesso.'];
        }else{
            return ['status' => 'error', 'msg' => 'Erro ao exlcuir funcionário.'];
        }
    }
}
