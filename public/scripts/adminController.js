'use strict';
angular.module("wagerCrony")
.controller('adminController', function ($scope,$http, $location) {

  $scope.sportType = "";
  $scope.visibilityFlags = {};
  $scope.visibilityFlags.showLeagueSelect = true;  
  $scope.controllerName = "AdminController";
  $scope.pick = {};
  $scope.setDefaultEventDate = function() {
    // $scope.dt = new Date();
    $scope.dt = new Date();
    $scope.pick.eventDate = new Date();
  };  

    $scope.alerts = [
   
  ];  

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

    $scope.loadSavedPicks = function(){
           $http.get('/api/picks/')
        .then(function(res){
					console.log("in success callback after API call");
					$scope.savedPicks = res.data;
					// console.log($scope.savedBets);
				},function(err){
					console.log("in error callback after API call");
					$scope.error_message = err;
					console.log(err);
				});  

    }

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
        $scope.pick.league = $scope.sportType;
        $scope.visibilityFlags.showPick= true;

    }  

     $scope.savePick = function(){
      console.log("adminController: call node service to persist Pick " + JSON.stringify($scope.pick));
      $http.post('/api/pick/',
      {
        data:{
          "league": $scope.pick.league,
          "visitingTeam": $scope.pick.visitingTeam,
          "homeTeam": $scope.pick.homeTeam,
          "eventDate": $scope.pick.eventDate,
          "description":$scope.pick.description
        }
      }).then(function(res){
        // localStorage.setItem("slug",res.data.slug);
        
        console.log('in success callback after persisting pick = ' + JSON.stringify(res));
        $scope.alerts.push({type:'success',msg: 'Pick saved!'});
        $scope.loadSavedPicks();
        $scope.visibilityFlags.showLeagueSelect = true;
         $scope.visibilityFlags.showPick= false;
         
      },function(err){
        console.log("in error callback after attempting to persist bet = " + JSON.stringify($scope.pick));
        
        console.log("error = " + err);
        $scope.alerts.push({type:'danger',msg: 'Pick not saved!'});
      });

  };






});
