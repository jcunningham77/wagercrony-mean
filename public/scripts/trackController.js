'use strict';
angular.module("wagerCrony")
.controller('trackController', function ($scope, $http) {

  $scope.name = "Matt McMonigle";
  $scope.controllerName = "TrackController";

  $scope.sportType = "";
  $scope.visibilityFlags = {};
  $scope.visibilityFlags.showLeagueSelect = true;

  // $scope.visibilityFlags.showHomeTable = false;
  // $scope.visibilityFlags.showVisitingTable = false;
  // $scope.visibilityFlags.showBet = false;

  
  $scope.bet = {};

  $scope.alerts = [
    // { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
    // { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
  ];

    $scope.savedBets = [{
                            "league": "MLB",
                            "visitingTeam": "Phillies",
                            "homeTeam": "Mets",
                             "gameDate": {
                                "$date": "2016-03-24T04:00:00.000Z"
                            },
                            "wager": 120,
                            "result": 80
                          },
                          {
                            "league": "MLB",
                            "visitingTeam": "Phillies",
                            "homeTeam": "Phillies",
                             "gameDate": {
                                "$date": "2016-03-24T04:00:00.000Z"
                            },                            
                            "wager": 100,
                            "result": 150
                          }];  

  $scope.loadTeamList = function(){
    console.log("loading team list for " + $scope.sportType);

     $http.get('/api/teams/' + $scope.sportType,
       {
					headers:{'userAuthToken':localStorage.getItem("twitterUserToken"),
							 'userAuthTokenSecret':localStorage.getItem("twitterUserTokenSecret")}
				}).then(function(res){
					console.log("in success callback after API call");
					$scope.teams = res.data;
					console.log($scope.teams);
				},function(err){
					console.log("in error callback after API call");
					$scope.error_message = err;
					console.log(err);
				});
  
    $scope.visibilityFlags.showVisitingTable=true;
    $scope.visibilityFlags.showLeagueSelect = false;
    $scope.bet.league = $scope.sportType;
    $scope.visibilityFlags.showBet= true;

  }

  $scope.saveBet = function(){
      console.log("call node service to persist " + JSON.stringify($scope.bet));
      $http.post('/api/bet/',
      {
        data:{
          "league": $scope.bet.league,
          "visitingTeam": $scope.bet.visitingTeam,
          "homeTeam": $scope.bet.homeTeam,
          "eventDate": $scope.bet.eventDate,
          "wager": $scope.bet.wager,
          "result": $scope.bet.result
        }
      }).then(function(res){
        // localStorage.setItem("slug",res.data.slug);
        
        console.log('in success callback after persisting bet = ' + JSON.stringify(res));
        $scope.alerts.push({type:'success',msg: 'Bet saved!'});
         $scope.visibilityFlags.showBet= false;
      },function(err){
        console.log("in error callback after attempting to persist bet = " + JSON.stringify($scope.bet));
        
        console.log("error = " + err);
        $scope.alerts.push({type:'danger',msg: 'Bet not saved!'});
      });

  };

  $scope.setDefaultEventDate = function() {
    // $scope.dt = new Date();
    $scope.dt = new Date();
    $scope.bet.eventDate = new Date();
  };  

  // $scope.setHome = function(homeTeam){
  //   console.log("in setHome, homeTeam = " + homeTeam);
  //   $scope.bet.homeTeam = homeTeam;
  // }



});