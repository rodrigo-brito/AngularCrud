angular.module("Usuario").factory("FuncionarioAPI", function($http){
	var _salvarFuncionario = function(funcionario){
		return $http.post('http://localhost:8080/funcionario/cadastrar', funcionario);
	};
	var _excluirFuncionario = function(id){
		return $http.delete('http://localhost:8080/funcionario/excluir/' + id);
	};
	var _listarFuncionarios = function(){
		return $http.get('http://localhost:8080/funcionario/listar');
	}
	return {
		listar: _listarFuncionarios,
		salvar: _salvarFuncionario,
		excluir: _excluirFuncionario
	};
})