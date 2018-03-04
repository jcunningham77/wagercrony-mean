angular.module('wagerCrony').controller('registerController', function ($scope, $location, dataService, authenticationService) {
    // debugger;
    $scope.controllerName = "RegisterController";



    //toast stuffs//todo - extract into it's own controller
    var last = {
        bottom: false,
        top: true,
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

    $scope.register = function () {

        dataService.register($scope.email, $scope.password).then(function (response) {
            if (response.success) {

                console.log("LoginController.login, success response data = " + JSON.stringify(response.data));
                // debugger;

                // console.log("LoginController.login - data from response to be stored in auth:");
                console.log("email:" + response.data.config.data.username);
                console.log("pw:" + response.data.config.data.password);
                authenticationService.SetCredentials(response.data);
                // vm.dataLoading = false;

                $location.path('/Picks');
            } else {

                $scope.alerts.push({ type: 'danger', msg: response.message });
                console.log("registerController.login, response is failure, message from Backendless = " + response.message);
                $scope.showSimpleToast(response.message);
            }
        });

    }


});