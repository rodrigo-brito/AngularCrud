var app = angular.module("Usuario", ['ui.bootstrap']);
app.controller("UsuarioController", function($scope, $uibModal, $log, $filter, $http){
	$scope.titulo = "Controle de Funcionários";

	//Lista de mensagens de feedback
	$scope.messages = {
		success: [],
		error: []
	};

	//Lista de Funcionários
	$scope.funcionarios = [];

	/**
	 * Abre modal com formulário de cadastro de funcionário
	 */
	$scope.novoFuncionario = function(){
		$scope.modalInstance = $uibModal
		.open({
			animation: true,
			templateUrl: 'view/cadastrar.html',
			scope: $scope,
			size: 'md'
		});
	};

	$scope.excluirFuncionarios = function(funcionarios){

		var selecionados = funcionarios.filter(function(funcionario){
			return funcionario.selecionado == true;
		}).map(function(funcionario){
			return funcionario.id;
		});

		var funcionario_selecionados = funcionarios.filter(function(funcionario){
			return funcionario.selecionado == true;
		});

		$scope.modalConfirmacao = $uibModal.open({
			animation: true,
			templateUrl: 'view/confirmar.html',
			size: 'md'
		}).result.then(function () {
			angular.forEach(selecionados, function(id){
				$http.delete('http://localhost:8080/funcionario/excluir/' + id).then(function(response){
					if(response.data.status === 'success'){
						$scope.messages.success.push(response.data.msg);
					}else{
						$scope.messages.error.push(response.data.msg);
					}
					$scope.atualizarListagem();
				}, function(response){
					$scope.messages.error.push("Erro ao excluir usuário, tente novamente mais tarde");
				});
			});
	    }, function () {
	    	console.log("Operação de exclusão cancelada.");
	    });
	}

	/**
	 * Retorna a lista de funcionários persistidos em banco de dados e atualiza listagem
	 * @return {Array} Array de funcionários
	 */
	$scope.atualizarListagem = function(){
		$http.get('http://localhost:8080/funcionario/listar').then(function (response){
			$scope.funcionarios = response.data;
		}, function (response){
			scope.messages.error.push("Erro ao listar funcionários, tente novamente mais tarde.");
		});
	};

	/**
	 * Fecha o modal de cadastrado/atualização de funcionários
	 */
	$scope.fecharModal = function (){
		$scope.modalInstance.dismiss();
	};

	/**
	 * Persiste dados de funcionário fornecido
	 * @param  {Object} funcionario funcionário a ser persistido
	 */
	$scope.salvarFuncionario = function(funcionario) {
		$http.post('http://localhost:8080/funcionario/cadastrar', funcionario)
		.then(function(response){
			var data = response.data;
			if(data.status === 'success'){
				$scope.messages.success.push(data.msg);
				delete funcionario;
				$scope.atualizarListagem();
				$scope.fecharModal();
			}else{
				$scope.modalMessages.error.push(data.msg);
			}
		}, function(response){
			console.log(response);
		});
	};

	$scope.atualizarListagem();
});