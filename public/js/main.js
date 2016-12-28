var app = angular.module("Usuario", ['ui.bootstrap']);
app.controller("UsuarioController", function($scope, $uibModal, $log, $http){
	$scope.titulo = "Controle de Funcionários";
	$scope.messages = {
		success: [],
		error: []
	};

	$scope.funcionarios = [
		{nome: "Rodrigo", telefone: "99999-8888", salario: 1500, email: "contato@rodrigobrito.net"},
		{nome: "Maria", telefone: "99999-7777", salario: 2000, email: "contato@maria.net", selecionado: false},
		{nome: "Pedro", telefone: "66666-7777", salario: 1200, email: "contato@pedro.net", selecionado: true}
	];

	$scope.novoFuncionario = function(){
		$scope.modalInstance = $uibModal
		.open({
			animation: true,
			templateUrl: 'view/cadastrar.html',
			scope: $scope,
			size: 'md'
		});
	};

	$scope.fecharModal = function (){
		$scope.modalInstance.dismiss();
	};

	$scope.salvarFuncionario = function(funcionario) {
		$http.post('http://localhost:8080/funcionario/cadastrar', funcionario)
		.then(function(response){
			var data = response.data;
			if(data.status === 'success'){
				$scope.messages.success.push(data.msg);
				delete funcionario;
				$scope.fecharModal();
			}else{
				$scope.modalMessages.error.push(data.msg);
			}
		}, function(response){
			console.log(response);
		});
	};
});