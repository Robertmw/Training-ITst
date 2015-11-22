(function () {
	'use strict';

	angular
		.module('myApp')
		.directive('timetable', timetable);

	function timetable () {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				taskList: '=taskList'
			},
			link: timetableLink,
			templateUrl: 'src/directives/timetable/timetable.html'
		}
	};

	function timetableLink (scope, element, attr) {
		scope.currentFilter = '';

		scope.delete = function () {
			scope.$emit('event::deleteTask', this.task);
		}

		scope.$on('event::setFilter', function (event, payload) {
			scope.currentFilter = payload.value;
		});

	}

})();