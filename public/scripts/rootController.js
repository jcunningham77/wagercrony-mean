'use strict';
angular.module("wagerCrony")
.controller('rootController', function ($scope,$http, $location, dataService, authenticationService) {

	// debugger;
    $scope.logout = function() {
									localStorage.clear();
									//todo - authenticationService is not defined, fix this injection issue
                                    // debugger;
									authenticationService.ClearCredentials();
									console.log('in logout function');
									$location.path('/Login');
                                    

					}
	$scope.isActive = function (route) {
		// debugger;
		// console.log("isActive, evaluating route " + route);
		// console.log("$location.path()= " + $location.path());
		// console.log("will return " + route === $location.path());
		return route === $location.path();
	}  		

});
