'use strict';
angular.module("wagerCrony")
.controller('picksController', function ($scope,$http) {

	$scope.propertyName = 'eventDate';
	$scope.reverse = true;
	
	$scope.sortBy = function(propertyName) {
		$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
		$scope.propertyName = propertyName;
	};
	


  $scope.controllerName = "PicksController";

      $http.get('/api/picks/')
        .then(function(res){
					console.log("in success callback after API call");
					$scope.savedPicks = res.data;
					// console.log($scope.savedPicks);
				},function(err){
					console.log("in error callback after API call");
					$scope.error_message = err;
					console.log(err);
				});    
});