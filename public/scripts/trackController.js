'use strict';
angular.module("wagerCrony")
.controller('trackController', function ($scope, $http, $rootScope, $route, $window) {

  
  $scope.controllerName = "TrackController";

  
  $scope.bet = {};

  $scope.alerts = [
    
   ];  

  //check if there were any stored alerts before the page was reloaded
  var alert = $window.localStorage.getItem("alert");
  if (alert){
    console.log("retrieved alert from local window storage, alert = " + alert);
    console.log("retrieved alert from local window storage, alert = " + JSON.parse(alert));
    $scope.alerts.push(JSON.parse(alert));
    $window.localStorage.removeItem("alert");

  }

  $scope.leagues = ['MLB','NHL'];

$scope.messageOnOpen = 'Select league above...';

$scope.isFormPopulated=false;
$scope.setFormPopulated = function(){
  console.log('setFormPopulated');
  if($scope.bet.wager
      &&$scope.bet.result
      &&$scope.bet.visitingTeam
      &&$scope.bet.homeTeam
      &&$scope.bet.eventDate){
    console.log("setFormPopulated = form is populated");
    $scope.isFormPopulated=true;
  }else {
    console.log("setFormPopulated = form is not populated");
    $scope.isFormPopulated=false;
  }
}


$scope.getSelectedText = function() {
  console.log('getSelectedText executed');
    if ($scope.bet.league !== undefined) {
      console.log('getSelectedText executed, $scope.bet.league is not null, = ' + $scope.bet.league);
      this.loadTeamList();
      $scope.messageOnOpen = 'Select a team...';
      return $scope.bet.league;
    } else {
      console.log('getSelectedText executed, $scope.bet.league is undefined');
      return "Please select an league...";
    }
};  



//for the date picker - move to a directive?
$scope.isOpen = false;


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




    

  

  $scope.loadTeamList = function(){
    console.log("loading team list for " + $scope.bet.league);

     $http.get('/api/teams/' + $scope.bet.league,
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
        
      //store the alert in local session data until figure out how the reset the form without
        //reloading the browser
        // $scope.alerts.push({type:'success',msg: 'Pick saved!'});

        $window.localStorage.setItem("alert", JSON.stringify({type:'success',msg: 'Bet tracked!'}));
        $scope.pick = {};

        // $location.path('/Admin');
        $route.reload();
        
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
});