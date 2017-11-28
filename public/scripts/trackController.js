'use strict';
angular.module("wagerCrony")
.controller('trackController', function ($scope, $http, $rootScope) {

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
   
  ];

  $scope.leagues = ['MLB','NHL'];

    $scope.getSelectedText = function() {
        if ($scope.selectedLeague !== undefined) {
          this.loadTeamList();
        } else {
          return "Please select an league";
        }
  }; 




    $http.get('/api/bets/' + $rootScope.globals.currentUser.username,)
        .then(function(res){
					console.log("in success callback after API call");
					$scope.savedBets = res.data;
					console.log($scope.savedBets);
				},function(err){
					console.log("in error callback after API call");
					$scope.error_message = err;
					console.log(err);
				});  

    $scope.loadSavedBets = function(){
           $http.get('/api/bets/' + $rootScope.globals.currentUser.username,)
        .then(function(res){
					console.log("in success callback after API call");
					$scope.savedBets = res.data;
					console.log($scope.savedBets);
				},function(err){
					console.log("in error callback after API call");
					$scope.error_message = err;
					console.log(err);
				});  

    }

    $scope.searchTermTeams;
    $scope.clearSearchTermTeams = function() {
      $scope.searchTermTeams = '';
    };
    // The md-select directive eats keydown events for some quick select
    // logic. Since we have a search input here, we don't need that logic.

    // $document.getElementById('searchTermTeamInput').on('keydown',function(ev){
    //   ev.stopPropagation();
    // });

// angular.element(document.querySelector('#searchTermTeamInput')).on('keydown',function(ev){
//   ev.stopPropagation();
// });



    

  

  $scope.loadTeamList = function(){
    console.log("loading team list for " + $scope.selectedLeague);

     $http.get('/api/teams/' + $scope.selectedLeague,
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
    $scope.bet.league = $scope.selectedLeague;
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
          "result": $scope.bet.result,
          "user":$rootScope.globals.currentUser.username
        }
      }).then(function(res){
        // localStorage.setItem("slug",res.data.slug);
        
        console.log('in success callback after persisting bet = ' + JSON.stringify(res));
        $scope.alerts.push({type:'success',msg: 'Bet saved!'});
        $scope.loadSavedBets();
        $scope.visibilityFlags.showLeagueSelect = true;
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