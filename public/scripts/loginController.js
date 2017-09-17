'use strict';
angular.module("wagerCrony")
.controller('loginController', function ($scope) {

  $scope.name = "Matt McMonigle";
  $scope.controllerName = "LoginController";

  $scope.username = "";
  $scope.password = "";

  $scope.login = function(){
    console.log('inside login function, username = ' + $scope.username + ', password = ' + $scope.password);

  }
});