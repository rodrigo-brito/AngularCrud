<!DOCTYPE html>
<html lang="en" ng-app="Usuario">
<head>
	<meta charset="UTF-8">
	<title>Angular Crud</title>
	<link rel="stylesheet" href="<?php echo url('/node_modules/bootstrap/dist/css/bootstrap.min.css'); ?>">
	<link rel="stylesheet" href="<?php echo url('/node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css'); ?>">
	<script src="<?php echo url('/node_modules/angular/angular.min.js'); ?>" type="text/javascript" charset="utf-8"></script>
	<script src="<?php echo url('/node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js'); ?>" type="text/javascript" charset="utf-8"></script>
	<script src="<?php echo url('/node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'); ?>" type="text/javascript" charset="utf-8"></script>
	<script src="<?php echo url('/js/main.js'); ?>" type="text/javascript" charset="utf-8"></script>
	<script src="<?php echo url('/js/services/FuncionarioAPIService.js'); ?>" type="text/javascript" charset="utf-8"></script>
	<script src="<?php echo url('/js/directives/uiDinheiroDirective.js'); ?>" type="text/javascript" charset="utf-8"></script>
	<script src="<?php echo url('/js/controllers/FuncionarioController.js'); ?>" type="text/javascript" charset="utf-8"></script>
	<style>
		.painel-controles {
			margin-bottom: 20px;
		}
	</style>
</head>
<body ng-controller="UsuarioController">
	<div class="container">
		<div class="well">
			<h4>{{ titulo }}</h4>
		</div>
		<div ng-if="messages">
			<div class="alert alert-danger" ng-show="messages.error.length">
				<ul>
					<li ng-repeat="error in messages.error">{{error}}</li>
				</ul>
			</div>
			<div class="alert alert-success" ng-show="messages.success.length">
				<ul>
					<li ng-repeat="success in messages.success">{{success}}</li>
				</ul>
			</div>
		</div>
		<div class="row painel-controles">
			<div class="col-md-12">
				<button class="btn btn-primary" ng-click="novoFuncionario()"><i class="glyphicon glyphicon-plus"></i> Novo</button>
				<button class="btn btn-info" ng-click="editarFuncionario(getFuncionariosSelecionados()[0])" ng-disabled="getFuncionariosSelecionados().length != 1"><i class="glyphicon glyphicon-pencil"></i> Editar</button>
				<button class="btn btn-danger" ng-click="excluirFuncionarios(funcionarios)" ng-disabled="getFuncionariosSelecionados().length < 1"><i class="glyphicon glyphicon-remove"></i> Excluir</button>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="thumbnail">
					<div class="form-group">
						<input type="text" class="form-control" ng-model="busca" name="busca" placeholder="Buscar...">
					</div>
					<table class="table table-striped" name="tblUsuarios">
						<tr>
							<th></th>
							<th>Nome</th>
							<th>Telefone</th>
							<th>Salário</th>
							<th>E-mail</th>
						</tr>
						<tr ng-repeat="funcionario in funcionarios | filter: busca">
							<th><input type="checkbox" name="selecionado" value="{{funcionario.id}}" ng-model="funcionario.selecionado"></th>
							<th>{{funcionario.nome}}</th>
							<th>{{funcionario.telefone}}</th>
							<th>{{funcionario.salario | currency}}</th>
							<th>{{funcionario.email}}</th>
						</tr>
					</table><!-- tblUsuarios -->
				</div>
			</div>
			<!-- /.col-md-12 -->
		</div>
		<!-- /.row -->
	</div>
	<!-- /.container -->
</body>
</html>