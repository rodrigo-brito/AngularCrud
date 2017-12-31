angular.module("Usuario").directive("uiDinheiro", function(){
	return {
		restrict: "A",
		require: "ngModel",
		link: function(scope, element, attrs, ctrl){
			/**
			 * Formata uma string no padrão basileiro monetário: R$ DDD,DD
			 * @param  {String} valor a ser formatado
			 * @return {String} valor no padrão basileiro monetário
			 */
			var _formatarDinheiro = function(valor){
				valor = valor.replace(/[^\d]/g,"");
				var tamanho = valor.length;
				if( valor ){
					return 'R$ ' + valor.substring(0,tamanho-2) + ',' + valor.substring(tamanho-2);
				}else{
					return "";
				}
			}

			element.bind("keyup", function(){
				ctrl.$setViewValue(_formatarDinheiro( ctrl.$viewValue ) );
				ctrl.$render();
			});

			ctrl.$formatters.push(function (value){
				if(value){
					return _formatarDinheiro(value);
				}
			});

			//O valor retornado pelo model não possui formatação
			ctrl.$parsers.push(function(value){
				return value.replace(',','.').replace(/[^\d.]+/g,'');
			});
		}
	};
});