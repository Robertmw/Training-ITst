(function () {
	'use strict';

	angular
		.module('myApp')
		.controller('MainController', mainController);

	function mainController ($scope, $http) {

		var vm = this;

		vm.filters = [];

		vm.taskList = [];

		$http.get('data.json')
			.success(function (data) {
				vm.filters = data.filters;
				vm.taskList = data.taskList;
			})
			.error(function (err) {
				console.log(err);
			});

		$scope.$on('event::addTask', function (event, payload) {
			vm.taskList.map(function (task, index) {
				if (task.day.toLowerCase() === payload.dayEvent.toLowerCase()) {
					vm.taskList[index].tasks.push(payload);
				}
			});
		});

		$scope.$on('event::deleteTask', function (event, payload) {
			vm.taskList.map(function (task) {
				task.tasks.map(function (el) {
					if (el.$$hashKey === payload.$$hashKey) {
						task.tasks.pop(el);
					}
				});
			});
		});

	}
	mainController.$inject = ['$scope', '$http'];
})();