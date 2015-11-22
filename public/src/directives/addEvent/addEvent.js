(function () {
	'use strict';

	angular
		.module('myApp')
		.directive('addEvent', addEvent);

	function addEvent () {
		return {
			restrict: 'E',
			replace: true,
			scope: {},
			link: addEventLink,
			templateUrl: 'src/directives/addEvent/addEvent.html'
		}
	};

	function addEventLink (scope, element, attr) {

		scope.toggleButton = false;

		scope.createTask = function (task) {
			scope.$emit('event::addTask', task);
		};

		scope.$on('event::toggleAddEvent', function () {
			if (scope.toggleButton) {
				scope.toggleButton = false;
			} else {
				scope.toggleButton = true;
			}
		});

	};

})();