'use strict';
angular.module("wagerCrony")
  .controller('trackController', function ($scope, $http, $rootScope, $route, $window, $mdToast) {


    $scope.controllerName = "TrackController";


    $scope.bet = {};



    //toast stuffs//todo - extract into it's own controller
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

    $scope.messageOnOpen = 'Select league above...';

    $scope.propertyName = 'createDate';
    $scope.reverse = true;

    $scope.sortBy = function (propertyName) {
      $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
      $scope.propertyName = propertyName;
    };





    $scope.isFormPopulated = false;
    $scope.setFormPopulated = function () {
      console.log('setFormPopulated');
      if ($scope.bet.wager
        && $scope.bet.visitingTeam
        && $scope.bet.homeTeam
        && $scope.bet.eventDate) {
        console.log("setFormPopulated = form is populated");
        $scope.isFormPopulated = true;
      } else {
        console.log("setFormPopulated = form is not populated");
        $scope.isFormPopulated = false;
      }
    }


    $scope.getSelectedText = function () {
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

    $scope.deleteBet = function (bet) {
      console.log("trackController - delete bet");
      // debugger;
      $http.put('/api/bet/',
        {
          data: {
            "_id": bet._id,
            "league": bet.league,
            "visitingTeam": bet.visitingTeam,
            "homeTeam": bet.homeTeam,
            "eventDate": bet.eventDate,
            "wager": bet.wager,
            "result": bet.result,
            "modifiedBy": $rootScope.globals.currentUser.username,
            "archived": true
          }


        }).then(function (res) {


          console.log('in success callback after updating pick = ' + JSON.stringify(res));
          
          $window.localStorage.setItem("alert", JSON.stringify({ type: 'success', msg: 'Bet archived!' }));

          $scope.pick = {};
          $route.reload();

        }, function (err) {
          console.log("in error callback after attempting to archive pick = " + JSON.stringify($scope.pick));

          console.log("error = " + err);
          $scope.showSimpleToast("bet not archived");
        });


    };




    $http.get('/api/bets/' + $rootScope.globals.currentUser.username, )
      .then(function (res) {
        console.log("in success callback after API call");
        $scope.savedBets = res.data;
        console.log($scope.savedBets);
      }, function (err) {
        console.log("in error callback after API call");
        $scope.error_message = err;
        console.log(err);
      });





    $scope.loadSavedBets = function () {
      $http.get('/api/bets/' + $rootScope.globals.currentUser.username, )
        .then(function (res) {
          console.log("in success callback after API call");
          $scope.savedBets = res.data;
          console.log($scope.savedBets);
        }, function (err) {
          console.log("in error callback after API call");
          $scope.error_message = err;
          console.log(err);
        });

    }

    $scope.searchTermTeams;








    $scope.loadTeamList = function () {
      console.log("loading team list for " + $scope.bet.league);

      $http.get('/api/teams/' + $scope.bet.league,
        {
          headers: {
            'userAuthToken': localStorage.getItem("twitterUserToken"),
            'userAuthTokenSecret': localStorage.getItem("twitterUserTokenSecret")
          }
        }).then(function (res) {
          console.log("in success callback after API call");
          $scope.teams = res.data;
          console.log($scope.teams);
        }, function (err) {
          console.log("in error callback after API call");
          $scope.error_message = err;
          console.log(err);
        });

    }


    $scope.saveBet = function () {
      console.log("call node service to persist " + JSON.stringify($scope.bet));
      $http.post('/api/bet/',
        {
          data: {
            "league": $scope.bet.league,
            "betTeam": $scope.bet.betTeam,
            "visitingTeam": $scope.bet.visitingTeam,
            "homeTeam": $scope.bet.homeTeam,
            "eventDate": $scope.bet.eventDate,
            "wager": $scope.bet.wager,
            "result": $scope.bet.result,
            "user": $rootScope.globals.currentUser.username
          }
        }).then(function (res) {
          // localStorage.setItem("slug",res.data.slug);

          console.log('in success callback after persisting bet = ' + JSON.stringify(res));


          $window.localStorage.setItem("alert", JSON.stringify({ type: 'success', msg: 'Bet saved!' }));
          // $scope.showSimpleToast("Bet added!");
          
          
          $scope.pick = {};

          
          $route.reload();

        }, function (err) {
          console.log("in error callback after attempting to persist bet = " + JSON.stringify($scope.bet));

          console.log("error = " + err);
          $window.localStorage.setItem("alert", JSON.stringify({ type: 'failure', msg: 'Bet not saved, please try again!' }));
          // $scope.showSimpleToast("Bet not saved, please try again!");
        });

    };

    $scope.setDefaultEventDate = function () {
      // $scope.dt = new Date();
      $scope.dt = new Date();
      $scope.bet.eventDate = new Date();
    };
  });