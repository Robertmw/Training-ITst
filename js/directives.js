(function () {
	'use strict';

	angular
		.module('myApp')
		.directive('addEvent', addEvent)
		.directive('globalHeader', globalHeader)
		.directive('timetable', timetable);

	function addEvent ($sce) {
		return {
			restrict: 'E',
			replace: true,
			scope: {},
			link: addEventLink,
			templateUrl: $sce.trustAsResourceUrl('templates/addEvent.html')
		}
	};

	addEvent.inject = ['$sce'];

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

	function globalHeader ($sce) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				filters: '=filters'
			},
			link: headerController,
			templateUrl: $sce.trustAsResourceUrl('templates/header.html')
		}
	}

	globalHeader.inject = ['$sce'];

	function headerController ($scope, element, $attrs) {
		$scope.currentFilter = $scope.filters[0];

		$scope.setFilter = function (filter) {
			$scope.currentFilter = filter;
			$scope.$parent.$broadcast('event::setFilter', $scope.currentFilter);
		}

		$scope.toggleAddEvent = function () {
			$scope.$parent.$broadcast('event::toggleAddEvent', null);
		}

		$scope.$watch('filters', function (newValue, oldValue) {
			if (newValue) {
				$scope.currentFilter = $scope.filters[0];
			}
		})

	}

	function timetable ($sce) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				taskList: '=taskList'
			},
			link: timetableLink,
			templateUrl: $sce.trustAsResourceUrl('templates/timetable.html')
		}
	};

	timetable.inject = ['$sce'];

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