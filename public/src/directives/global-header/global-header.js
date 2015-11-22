(function () {
	'use strict';

	angular
		.module('myApp')
		.directive('globalHeader', globalHeader);

	function globalHeader () {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				filters: '=filters'
			},
			link: headerController,
			templateUrl: 'src/directives/global-header/global-header.html'
		}
	}

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

})();