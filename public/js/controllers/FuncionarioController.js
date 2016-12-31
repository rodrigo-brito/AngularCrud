angular.module("Usuario").controller("UsuarioController", function($scope, $uibModal, $log, $filter, $http, FuncionarioAPI){
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
		$scope.modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'view/cadastrar.html',
			scope: $scope,
			size: 'md'
		});

		$scope.modalInstance.result.then(function(funcionario){
			FuncionarioAPI.salvar(funcionario).then(function(response){
				var data = response.data;
				if(data.status === 'success'){
					$scope.messages.success.push(data.msg);
					delete funcionario;
					$scope.atualizarListagem();
				}else{
					$scope.modalMessages.error.push(data.msg);
				}
			}, function(response){
				console.log(response);
			});
		},function(){
			delete $scope.funcionario;
		});
	};

	$scope.editarFuncionario = function(funcionario){
		$scope.funcionario = funcionario;

		$scope.modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'view/cadastrar.html',
			scope: $scope,
			size: 'md'
		});

		$scope.modalInstance.result.then(function(funcionario){
			FuncionarioAPI.atualizar(funcionario).then(function(response){
				var data = response.data;
				if(data.status === 'success'){
					$scope.messages.success.push(data.msg);
					delete funcionario;
					$scope.atualizarListagem();
				}else{
					$scope.modalMessages.error.push(data.msg);
				}
			}, function(response){
				console.log(response);
			});
		},function(){
			delete $scope.funcionario;
		});
	};

	$scope.getFuncionariosSelecionados = function(){
		return $scope.funcionarios.filter(function(funcionario){
			return funcionario.selecionado === true;
		});
	};

	$scope.excluirFuncionarios = function(funcionarios){

		$scope.modalConfirmacao = $uibModal.open({
			animation: true,
			templateUrl: 'view/confirmar.html',
			size: 'md'
		}).result.then(function () {
			angular.forEach($scope.getFuncionariosSelecionados(), function(funcionario){
				FuncionarioAPI.excluir(funcionario.id).then(function(response){
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
		FuncionarioAPI.listar().then(function (response){
			$scope.funcionarios = response.data;
		}, function (response){
			scope.messages.error.push("Erro ao listar funcionários, tente novamente mais tarde.");
		});
	};

	$scope.atualizarListagem();
});