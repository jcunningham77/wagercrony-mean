'use strict';
angular.module("wagerCrony")
	.controller('picksController', function ($scope, $http, $mdDialog) {

		$scope.propertyName = 'eventDate';
		$scope.reverse = true;

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
			$mdToast.show(
				$mdToast.simple()
					.textContent(message)
					.position($scope.getToastPosition())
					.hideDelay(3000)
			);
		}

		$scope.sortBy = function (propertyName) {
			$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
			$scope.propertyName = propertyName;
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

		$scope.controllerName = "PicksController";

		$http.get('/api/picks/')
			.then(function (res) {
				console.log("in success callback after API call");
				$scope.savedPicks = res.data;
				// console.log($scope.savedPicks);
			}, function (err) {
				console.log("in error callback after API call");
				$scope.error_message = err;
				console.log(err);
			});

		$http.get('/api/pickStats/')
			.then(function (res) {
				console.log("in success callback after pickStats API call, " + JSON.stringify(res));
				$scope.pickStats = res.data;
				
			}, function (err) {
				console.log("in error callback after API call");
				$scope.error_message = err;
				console.log(err);
			});


	});