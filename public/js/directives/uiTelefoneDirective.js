angular.module("Usuario").directive("uiTelefone", function(){
	return {
		restrict: "A",
		require: "ngModel",
		link: function(scope, element, attrs, ctrl){

			/**
			 * Formata uma string no padrão basileiro de telefonia: (DD) D DDDD-DDDD
			 * @param  {String} telefone valor a ser formatado
			 * @return {String} telefone no padrão basileiro
			 */
			var _formatarTelefone = function(telefone){
				if( !telefone ){
					return "";
				}

				telefone = telefone.replace(/[^\d]/g, "");

				if( telefone.length > 10){
					return "(" + telefone.substring(0,2) + ") " + telefone.substring(2,3) + " " + telefone.substring(3,7) + "-" + telefone.substring(7,11);
				}

				return "(" + telefone.substring(0,2) + ") " + telefone.substring(2,6) + "-" + telefone.substring(6,11);
			};

			element.bind("keyup", function(){
				ctrl.$setViewValue(_formatarTelefone(ctrl.$viewValue));
				ctrl.$render();
			});

			ctrl.$formatters.push(function(value){
				return _formatarTelefone(value);
			});
		}
	};
});