'use strict';
angular.module("wagerCrony")
.controller('rootController', function ($scope,$http, $location, dataService, authenticationService) {
    $scope.logout = function(authenticationService) {
									localStorage.clear();
									//todo - authenticationService is not defined, fix this injection issue
									authenticationService.ClearCredentials();
									console.log('in logout function');
									$location.path('/Login');

					}

});
