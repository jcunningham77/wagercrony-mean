'use strict';
angular.module("wagerCrony")
.controller('trackController', function ($scope, $http) {

  $scope.name = "Matt McMonigle";
  $scope.controllerName = "TrackController";

  $scope.sportType = "";
  
  $scope.showHomeTable = false;

  $scope.loadTeamList = function(){
    console.log("loading team list for " + $scope.sportType);
    

        
            $scope.teams = [
                  {"name":"Anaheim Ducks"},
                  {"name":"Arizona Coyotes"},
                  {"name":"Boston Bruins"},
                  {"name":"Buffalo Sabres"},
                  {"name":"Calgary Flames"},
                  {"name":"Carolina Hurricanes"},
                  {"name":"Chicago Blackhawks"},
                  {"name":"Colorado Avalanche"},
                  {"name":"Columbus Blue Jackets"},
                  {"name":"Dallas Stars"},
                  {"name":"Detroit Red Wings"},
                  {"name":"Edmonton Oilers"},
                  {"name":"Florida Panthers"},
                  {"name":"Los Angeles Kings"},
                  {"name":"Minnesota Wild"},
                  {"name":"Montreal Canadiens"},
                  {"name":"Nashville Predators"},
                  {"name":"New Jersey Devils"},
                  {"name":"New York Islanders"},
                  {"name":"New York Rangers"},
                  {"name":"Ottawa Senators"},
                  {"name":"Philadelphia Flyers"},
                  {"name":"Pittsburgh Penguins"},
                  {"name":"San Jose Sharks"},
                  {"name":"St. Louis Blues"},
                  {"name":"Tampa Bay Lightning"},
                  {"name":"Toronto Maple Leafs"},
                  {"name":"Vancouver Canucks"},
                  {"name":"Washington Capitals"},
                  {"name":"Winnipeg Jets"}
                ]
        
    
    $scope.showHomeTable = true;


    
  }



});