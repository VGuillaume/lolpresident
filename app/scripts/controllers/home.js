'use strict';

/**
 * @ngdoc function
 * @name lolking_2.0.controller:MainCtrl
 * @description
 * # HomeCtrl
 * Controller of the lolking_2.0
 */
angular.module('lolking_2.0')
  .controller('HomeCtrl', ['$scope',
    function($scope){
        $scope.message = "Bienvenue sur la page d'accueil du Président de lol";
    }
]);