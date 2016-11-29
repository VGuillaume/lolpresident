'use strict';

/**
 * @ngdoc function
 * @name lolking_2.0.controller:MainCtrl
 * @description
 * # HomeCtrl
 * Controller of the lolking_2.0
 */
angular.module('lolking_2.0')
  .controller('SummNameCtrl', function($scope, $rootScope, $http){
		// https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/355321?api_key=RGAPI-897d1b7e-d00e-4703-8576-a30464e334b3
		
		
		// Prise Rest pour récupérer infos à partir du summName :
		// https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/{summonerName}?api_key=RGAPI-897d1b7e-d00e-4703-8576-a30464e334b3		
		
		$scope.validate = function(queueType) {
			
			var name = $scope.summName.name;
			var summId = $rootScope.summonerId;
			
			$scope.loadingIcon = 'dragontail-6.22.1\\img\\global\\load03.svg';
			
			getIdByName();
			
			
			function getIdByName() {
				if(name) {
					
					$scope.submittedName = true;
					
					// récupération des données du summoner
					$scope.isBusy = $http.get('https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/' + name + '?api_key=RGAPI-897d1b7e-d00e-4703-8576-a30464e334b3')
					
					// ligne de test sur data locale
					// $http.get('dataName.json')
					.then(function(response) {
						var summInfos = $scope.summInfos = response.data;
						console.log(summInfos);
						
						for(var key in summInfos) {
							var obj = summInfos[key];
							// définition d'un scope pour le champ name, id, id de l'icone et niveau
							summId = $rootScope.summonerId = obj['id'];
							$scope.summonerName = obj['name'];
							$scope.summonerLevel = obj['summonerLevel'];
							$scope.profileIconId = obj['profileIconId'];
							
							// path to profileIcons images : C:\\Users\\A646900\\Documents\\DevPerso\\angularJS\\tutoriel-angular-app - NODE\\dragontail-6.22.1\\6.22.1\\img\\profileicon
							$scope.profileIcon = 'dragontail-6.22.1\\6.22.1\\img\\profileicon\\' + $scope.profileIconId + '.png';
							$scope.profileIconDefault = 'dragontail-6.22.1\\6.22.1\\img\\profileicon\\501.png';
							
							// [0] : ranked 5v5
							// [1] : ranked flex
							// [2] : ranked 3V3
							
							getRankById(queueType);
							console.log(queueType);
						}
					})
					.catch(function(response) {
						console.error('summInfos error', response.status, response.data);
						$scope.submittedName = false;
						$scope.errorMessage = ' ne correspond à aucun pseudo connu, veuillez vérifier l\'orthographe';
						})
					.finally(function() {
						console.log("finished summInfos");
						});
				} else {
					$scope.submittedName = false;
				}
			}
			
			// récupréation des données classées du summoner
			
			function getRankById(queueParam) {
				if(summId) {
					
					// prise REST : https://euw.api.pvp.net/api/lol/euw/v2.5/league/by-summoner/{summonerId}/entry?api_key=RGAPI-897d1b7e-d00e-4703-8576-a30464e334b3	
					$http.get('https://euw.api.pvp.net/api/lol/euw/v2.5/league/by-summoner/' + summId + '/entry?api_key=RGAPI-897d1b7e-d00e-4703-8576-a30464e334b3')
					// ligne de test sur data locale
					// $http.get('summLeague.json')
					.then(function(response) {
						var summLeague = $scope.summLeague = response.data;
						
						console.log(summId);
						console.log(summLeague);
						
						// console.log(summLeague);
						
						// définition d'un scope pour le champ name, id, id de l'icone et niveau
						for(var key in summLeague) {
							var dataLeague = summLeague[key];
							
							// [0] : ranked 5v5
							// [1] : ranked flex
							// [2] : ranked 3V3

							$scope.queue = dataLeague[queueParam].queue;
							$scope.tierRankImg = dataLeague[queueParam].tier;
							$scope.tierRank = dataLeague[queueParam].tier;
							$scope.wins = dataLeague[queueParam].wins;
							$scope.losses = dataLeague[queueParam].losses;
							
							console.log($scope.tierRank);
							
							if($scope.queue) {
								$scope.isRanked = true;
							}
							
							switch ($scope.queue) {
								case 'RANKED_SOLO_5x5':
									$scope.queue = 'Ranked solo 5v5';
									break;
								case 'RANKED_FLEX_SR':
									$scope.queue = 'Ranked Flex';
										break;
								case 'RANKED_TEAM_3x3':
									$scope.queue = 'Ranked Team 3v3';
									break;
								default:
									$scope.queue = 'Not Ranked';
							}
							
							switch ($scope.tierRankImg) {
								case 'BRONZE':
									$scope.tierRankImg = 'dragontail-6.22.1\\6.22.1\\img\\profileicon\\1395.png';
									break;
								case 'SILVER':
									$scope.tierRankImg = 'dragontail-6.22.1\\6.22.1\\img\\profileicon\\1398.png';
									break;
								case 'GOLD':
									$scope.tierRankImg = 'dragontail-6.22.1\\6.22.1\\img\\profileicon\\1401.png';
									break;
								case 'PLATINUM':
									$scope.tierRankImg = 'dragontail-6.22.1\\6.22.1\\img\\profileicon\\1404.png';
									break;
								case 'DIAMOND':
									$scope.tierRankImg = 'dragontail-6.22.1\\6.22.1\\img\\profileicon\\1413.png';
									break;
								case 'MASTER':
									$scope.tierRankImg = 'dragontail-6.22.1\\6.22.1\\img\\profileicon\\1416.png';
									break;
								default:
									$scope.tierRankImg = 'dragontail-6.22.1\\6.22.1\\img\\profileicon\\2074.png';
							}
							
							
							for(var keyEntrie in dataLeague) {
								dataLeague[queueParam].entries[keyEntrie];
								$scope.division = dataLeague[queueParam].entries[0].division;
								$scope.LP = dataLeague[queueParam].entries[0].leaguePoints;
							}
						}
					})
					.catch(function(response) {
						console.error('summLeague error', response.status, response.data);
						$scope.isRanked = false;
						$scope.errorRankedMessage = 'Non classé';
					})
					.finally(function() {
						console.log("finished summLeague");
					});
				};
			};		
		};
	});