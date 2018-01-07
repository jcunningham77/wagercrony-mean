'use strict';
angular.module("wagerCrony")
.controller('adminController', function ($scope,$http, $location, $route, $window) {

  $scope.sportType = "";

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
  
  $scope.leagues = ['MLB','NHL','NFL'];
  $scope.showErrors=true;

  $scope.propertyName = 'createDate';
	$scope.reverse = true;
	
	$scope.sortBy = function(propertyName) {
		$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
		$scope.propertyName = propertyName;
	};
	

  $scope.pick = {};
  $scope.setDefaultEventDate = function() {
    // $scope.dt = new Date();
    $scope.dt = new Date();
    $scope.pick.eventDate = new Date();
  };  

 

  $scope.messageOnOpen = 'Select league above...';

  $scope.clearSearchTermTeams = function() {
    $scope.searchTermTeamInput = '';
    console.log("searchInputTextFieldSelectList directive, clearsearchTermTeams cleared.")
  };
  
  $scope.isFormPopulated=false;
  $scope.setFormPopulated = function(){
    console.log('setFormPopulated');
    if($scope.pick.visitingTeam
        &&$scope.pick.homeTeam
        &&$scope.pick.eventDate){
          console.log("setFormPopulated: form is  populated");
      $scope.isFormPopulated=true;
    }else {
      console.log("setFormPopulated: form is  not populated");
      $scope.isFormPopulated=false;
    }
  }
  
  $scope.getSelectedText = function() {
    console.log('getSelectedText executed');
    if ($scope.pick.league !== undefined) {
      console.log('getSelectedText executed, $scope.pick.league is not null, = ' + $scope.pick.league);
      this.loadTeamList();
      $scope.messageOnOpen = 'Select a team...';
      return $scope.pick.league;
    } else {
      console.log('getSelectedText executed, $scope.pick.league is undefined');
      return "Please select an league...";
    }
};  

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
        console.log("loading team list for " + $scope.pick.league);

        $http.get('/api/teams/' + $scope.pick.league,
        {}).then(function(res){
                        console.log("in success callback after API call");
                        $scope.teams = res.data;
                        console.log($scope.teams);
                    },function(err){
                        console.log("in error callback after API call");
                        $scope.error_message = err;
                        console.log(err);
                    });
    
        
        
        

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
        
        
        console.log('in success callback after persisting pick = ' + JSON.stringify(res));
        //store the alert in local session data until figure out how the reset the form without
        //reloading the browser
        // $scope.alerts.push({type:'success',msg: 'Pick saved!'});

        $window.localStorage.setItem("alert", JSON.stringify({type:'success',msg: 'Pick saved!'}));
        $scope.pick = {};

        // $location.path('/Admin');
        $route.reload();
        
   
      },function(err){
        console.log("in error callback after attempting to persist pick = " + JSON.stringify($scope.pick));
        
        console.log("error = " + err);
        $scope.alerts.push({type:'danger',msg: 'Pick not saved!'});
      });

  };






});
