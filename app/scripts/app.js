'use strict';

/**
 * @ngdoc overview
 * @name lolking_2.0
 * @description
 * # lolking_2.0
 *
 * Main module of the application.
 */
angular
	.module('lolking_2.0', [
		'ngRoute',
		'angular-spinkit',
		'cgBusy'
	])
	.config(function ($routeProvider) {
		$routeProvider
		.when('/home', {
			templateUrl: 'views/home.html',
			controller: 'HomeCtrl',
			controllerAs: 'home'
		})
		.when('/summName', {
			templateUrl: 'views/summName.html',
			controller: 'SummNameCtrl',
			controllerAs: 'summName'
		})
		.when('/test', {
			templateUrl: 'views/busyTemplate.html',
			controller: 'BusyCtrl',
			controllerAs: 'test'
		})
		.otherwise({
			redirectTo: '/home'
		});
	})
    .directive('routeLoadingIndicator', function($rootScope) {
    return {
		restrict: 'E',
		template: "<div ng-show='isRouteLoading' class='loading-indicator'>" +
		"<div class='loading-indicator-body'>" +
		"<h3 class='loading-title'>Loading...</h3>" +
		"<div class='spinner'><rotating-plane-spinner></rotating-plane-spinner></div>" +
		"</div>" +
		"</div>",
		replace: true,
		link: function(scope, elem, attrs) {
        scope.isRouteLoading = false;

        $rootScope.$on('$routeChangeStart', function() {
			scope.isRouteLoading = true;
        });
        $rootScope.$on('$routeChangeSuccess', function() {
			scope.isRouteLoading = false;
        });
      }
    };
    })
    .directive('myEnter', function () {
	  return function (scope, element, attrs) {
		element.bind('keydown keypress', function (event) {
			if(event.which === 13) {
				scope.$apply(function (){
					scope.$eval(attrs.myEnter);
				});
				event.preventDefault();
			}
		});
	};
});
