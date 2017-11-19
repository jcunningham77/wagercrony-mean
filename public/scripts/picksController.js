'use strict';
angular.module("wagerCrony")
.controller('picksController', function ($scope,$http) {


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