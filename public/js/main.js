var app = angular.module("Usuario", []);
app.controller("UsuarioController", function($scope){
	$scope.titulo = "Controle de Funcionários";
	$scope.messages = {
		success: [],
		error: ["Erro 1", "Erro 2"]
	}
	$scope.funcionarios = [
		{nome: "Rodrigo", telefone: "99999-8888", salario: 1500, email: "contato@rodrigobrito.net"},
		{nome: "Maria", telefone: "99999-7777", salario: 2000, email: "contato@maria.net", selecionado: false},
		{nome: "Pedro", telefone: "66666-7777", salario: 1200, email: "contato@pedro.net", selecionado: true}
	];
});