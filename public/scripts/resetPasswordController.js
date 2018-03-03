angular.module('wagerCrony').controller('resetPasswordController', function ($scope, $location, dataService, authenticationService, $mdToast, $document) {
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

    $scope.resetpassword = function () {

        console.log('resetpasswordController - reset password');
        dataService.resetpassword($scope.email).then(function (response) {
            if (response.success) {
                // debugger;
                console.log('reset password link has been set');
                $scope.showSimpleToast('Check Email For Reset Password Link');

            } else {
                console.log('reset password didn\'t go correctly');
            }
        });
    }
});