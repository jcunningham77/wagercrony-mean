
'use strict';
angular.module("wagerCrony")
  .controller('adminController', function ($scope, $http, $location, $route, $window, $rootScope, $mdDialog, $mdToast) {

    $scope.sportType = "";

    $scope.alerts = [

    ];





    var last = {
      bottom: true,
      top: false,
      left: false,
      right: true
    };
    $scope.toastPosition = angular.extend({}, last);
    $scope.getToastPosition = function () {
      sanitizePosition();
      return Object.keys($scope.toastPosition)
        .filter(function (pos) { return $scope.toastPosition[pos]; })
        .join(' ');
    }
    function sanitizePosition() {
      var current = $scope.toastPosition;
      if (current.bottom && last.top) current.top = false;
      if (current.top && last.bottom) current.bottom = false;
      if (current.right && last.left) current.left = false;
      if (current.left && last.right) current.right = false;
      last = angular.extend({}, current);
    }

    //
    $scope.showSimpleToast = function (message) {
      // debugger;
      $mdToast.show(
        $mdToast.simple()
          .textContent(message)
          .position($scope.getToastPosition())
          .hideDelay(3000)
      );
    }

    //check if there were any stored alerts before the page was reloaded
    var alert = $window.localStorage.getItem("alert");
    if (alert) {
      console.log("retrieved alert from local window storage, alert = " + alert);
      console.log("retrieved alert from local window storage, alert = " + JSON.parse(alert));
      // $scope.alerts.push(JSON.parse(alert));
      // debugger;
      var alertObj = JSON.parse(alert);
      $scope.showSimpleToast(alertObj.msg);
      $window.localStorage.removeItem("alert");
    }


    $scope.leagues = ['MLB', 'NHL', 'NFL'];
    $scope.showErrors = true;

    $scope.propertyName = 'createDate';
    $scope.reverse = true;

    $scope.sortBy = function (propertyName) {
      $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
      $scope.propertyName = propertyName;
    };



    $scope.pick = {};

    $scope.setDefaultEventDate = function () {
      // $scope.dt = new Date();
      $scope.dt = new Date();
      $scope.pick.eventDate = new Date();
    };





    $scope.messageOnOpen = 'Select league above...';

    $scope.resultValues = [{ label: "Pending...", value: null },
    { label: "Win", value: 1 },
    { label: "Push", value: 0 },
    { label: "Loss", value: -1 }
    ];


    $scope.clearSearchTermTeams = function () {
      $scope.searchTermTeamInput = '';
      console.log("searchInputTextFieldSelectList directive, clearsearchTermTeams cleared.")
    };

    $scope.formMessage = "Enter Pick to Promote";
    $scope.editPickMode = false;

    $scope.propertyName = 'eventDate';

    $scope.sortBy = function (propertyName) {
      $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
      $scope.propertyName = propertyName;
    };

    $scope.editPick = function (pick) {

      console.log("adminController: editPick = pick:" + JSON.stringify(pick));

      // $scope.removeFromListByIndex($scope.savedPicks,pick);
      // $scope.savedPicks = $scope.removeFromListByFilter($scope.savedPicks,pick);
      console.log("adminController: editPick , returned from the method call");
      $scope.pick = pick;
      // debugger;
      $scope.editPickMode = true;
      $scope.formMessage = "Edit Pick to Promote";
      $window.scrollTo(0, 0);
    }


    $scope.cancelEdit = function () {
      $scope.editPickMode = false;

      $scope.pick = {};
      $scope.formMessage = "Enter Pick to Promote";
      //todo reload route until figure out how to reset form 
      $route.reload();

    }

    $scope.removeFromListByIndex = function remove(array, element) {
      // debugger;
      console.log("adminController: removeFromList = pick:" + JSON.stringify(element));
      const index = array.indexOf(element);
      array.splice(index, 1);
    }

    $scope.removeFromListByFilter = function remove(array, element) {
      return array.filter(e => e !== element);
    }

    $scope.isFormPopulated = false;
    $scope.setFormPopulated = function () {
      console.log('setFormPopulated');
      if ($scope.pick.visitingTeam
        && $scope.pick.homeTeam
        && $scope.pick.eventDate) {
        console.log("setFormPopulated: form is  populated");
        $scope.isFormPopulated = true;
      } else {
        console.log("setFormPopulated: form is  not populated");
        $scope.isFormPopulated = false;
      }

    };



    $scope.getSelectedText = function () {
      // console.log('getSelectedText executed');
      if ($scope.pick.league !== undefined) {
        // console.log('getSelectedText executed, $scope.pick.league is not null, = ' + $scope.pick.league);
        this.loadTeamList();
        this.loadPickOutcomeList();
        $scope.messageOnOpen = 'Select a team...';
        return $scope.pick.league;
      } else {
        // console.log('getSelectedText executed, $scope.pick.league is undefined');
        return "Please select an league...";
      }
    };

    $scope.showPickDetails = function (pick, event) {
      $mdDialog.show(
        $mdDialog.alert()
          .title('Pick Details')
          .textContent(pick.description)
          .ariaLabel('Pick Descrition')
          .ok('Ok!')
          .targetEvent(event)
      );
    };

    $http.get('/api/picks/')
      .then(function (res) {
        console.log("in success callback after API call");
        $scope.savedPicks = res.data;
        console.log($scope.savedPicks);
      }, function (err) {
        console.log("in error callback after API call");
        $scope.error_message = err;
        console.log(err);
      });

    $scope.loadSavedPicks = function () {
      $http.get('/api/picks/')
        .then(function (res) {
          console.log("in success callback after API call");
          $scope.savedPicks = res.data;
          // console.log($scope.savedBets);
        }, function (err) {
          console.log("in error callback after API call");
          $scope.error_message = err;
          console.log(err);
        });

    }

    $scope.loadTeamList = function () {
      console.log("loading team list for " + $scope.pick.league);

      $http.get('/api/teams/' + $scope.pick.league,
        {}).then(function (res) {
          console.log("in success callback after API call");
          $scope.teams = res.data;
          console.log($scope.teams);
        }, function (err) {
          console.log("in error callback after API call");
          $scope.error_message = err;
          console.log(err);
        });
    }

    $scope.loadPickOutcomeList = function () {
      console.log("loading pick outcome list for " + $scope.pick.league);

      $http.get('/api/pick-outcomes/' + $scope.pick.league,
        {}).then(function (res) {
          console.log("in success callback after api/pick-outcomes/ API call");
          $scope.teamsOutcomeList = res.data;
          console.log($scope.teamsOutcomeList);
        }, function (err) {
          console.log("in error callback after API call");
          $scope.error_message = err;
          console.log(err);
        });
    }




    $scope.deletePick = function (pick) {
      console.log("adminController - delete pick");
      $http.put('/api/pick/',
        {
          data: {
            "_id": pick._id,
            "league": pick.league,
            "pickTeam": pick.pickTeam,
            "pickLogo": pick.pickLogo,
            "pickLine": pick.pickLine,
            "pickMoneyLine": pick.pickMoneyLine,
            "result": pick.result,
            "league": pick.league,
            "visitingTeam": pick.visitingTeam,
            "homeTeam": pick.homeTeam,
            "eventDate": pick.eventDate,
            "description": pick.description,
            "modifiedBy": $rootScope.globals.currentUser.username,
            "archived": true
          }


        }).then(function (res) {


          console.log('in success callback after updating pick = ' + JSON.stringify(res));
          //store the alert in local session data until figure out how the reset the form without
          //reloading the browser
          $scope.alerts.push({ type: 'success', msg: 'Pick saved!' });
          $scope.pick = {};
          $route.reload();


        }, function (err) {
          console.log("in error callback after attempting to archive pick = " + JSON.stringify($scope.pick));

          console.log("error = " + err);
          $scope.alerts.push({ type: 'success', msg: 'Pick not saved!' });
          $scope.pick = {};
          $route.reload();
        });


    }



    $scope.updatePick = function () {
      console.log("adminController: updatePick: call node service to update Pick " + JSON.stringify($scope.pick));
      // debugger;
      $http.put('/api/pick/',
        {
          data: {
            "_id": $scope.pick._id,
            "league": $scope.pick.league,
            "pickTeam": $scope.pick.pickTeam,
            "pickLogo": $scope.pick.pickLogo,
            "pickLine": $scope.pick.pickLine,
            "pickMoneyLine": $scope.pick.pickMoneyLine,
            "result": $scope.pick.result,
            "league": $scope.pick.league,
            "visitingTeam": $scope.pick.visitingTeam,
            "homeTeam": $scope.pick.homeTeam,
            "eventDate": $scope.pick.eventDate,
            "description": $scope.pick.description,
            "modifiedBy": $rootScope.globals.currentUser.username,
            "archived": false
          }


        }).then(function (res) {


          console.log('in success callback after updating pick = ' + JSON.stringify(res));
          //store the alert in local session data until figure out how the reset the form without
          //reloading the browser

          $window.localStorage.setItem("alert", JSON.stringify({ type: 'success', msg: 'Pick updated!' }));
          $scope.pick = {};


          //todo - might need to keep this until we can figure out how to reset the form without
          //reloading the page
          $route.reload();


        }, function (err) {
          console.log("in error callback after attempting to update pick = " + JSON.stringify($scope.pick));

          console.log("error = " + err);
          $window.localStorage.setItem("alert", JSON.stringify({ type: 'failure', msg: 'Pick not updated!' }));
        });
    }

    $scope.savePick = function () {
      console.log("adminController: savePick: call node service to persist Pick " + JSON.stringify($scope.pick));
      $http.post('/api/pick/',
        {
          data: {
            "league": $scope.pick.league,
            "pickTeam": $scope.pick.pickTeam,
            "pickLogo": $scope.pick.pickLogo,
            "pickLine": $scope.pick.pickLine,
            "pickMoneyLine": $scope.pick.pickMoneyLine,
            "result": $scope.pick.result,
            "visitingTeam": $scope.pick.visitingTeam,
            "homeTeam": $scope.pick.homeTeam,
            "eventDate": $scope.pick.eventDate,
            "description": $scope.pick.description,
            "creator": $rootScope.globals.currentUser.username,
            "archived": false
          }
        }).then(function (res) {


          console.log('in success callback after persisting pick = ' + JSON.stringify(res));
          //store the alert in local session data until figure out how the reset the form without
          //reloading the browser
          // $scope.alerts.push({type:'success',msg: 'Pick saved!'});

          $window.localStorage.setItem("alert", JSON.stringify({ type: 'success', msg: 'Pick saved!' }));

          $scope.pick = {};

          // $location.path('/Admin');
          $route.reload();


        }, function (err) {
          console.log("in error callback after attempting to persist pick = " + JSON.stringify($scope.pick));

          console.log("error = " + err);
          $scope.alerts.push({ type: 'danger', msg: 'Pick not saved!' });
        });

    };
  });
