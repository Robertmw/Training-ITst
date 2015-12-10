(function() {
	'use strict';

	angular
	.module('myApp', ['ngAnimate'])
	.filter('convertHour', function () {
		return function (input) {
			return input + ':00';
		}
	});

})();