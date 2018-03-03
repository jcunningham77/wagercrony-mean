'use strict';
angular.module("wagerCrony")
    .controller('loginController', function ($scope, $http, $location, dataService, authenticationService, $animate, toastService) {


        $scope.controllerName = "LoginController";

        var TAG = "loginController";

        $scope.username = "";
        $scope.password = "";

        $scope.alerts = [

        ];

        $scope.login = function () {
            dataService.login($scope.emailAddress, $scope.password).then(function (response) {
                if (response.success) {

                    console.log("LoginController.login, success response data = " + JSON.stringify(response.data));
                    // debugger;

                    // console.log("LoginController.login - data from response to be stored in auth:");
                    console.log("email:" + response.data.config.data.username);
                    console.log("pw:" + response.data.config.data.password);
                    authenticationService.SetCredentials(response.data);
                    // vm.dataLoading = false;

                    $location.path('/Track');
                } else {
                    // debugger;
                    var element = angular.element(document).find(loginForm);
                    console.log('add shake class');
                    $animate.addClass(element, 'shake', function () {
                        console.log('remove shake class');
                        $animate.removeClass(element, 'shake');
                    });
                    // $scope.alerts.push({type: 'danger',msg: response.message});
                    toastService.showSimpleToast(response.message);
                    console.log("LoginController.login, response is failure, message from Backendless = " + response.message);
                    //TODO work on flash service for error feedback
                    // flashService.Error(response.message);
                    // vm.password="";
                    // vm.dataLoading = false;
                }
            });
        }

        $scope.resetpassword = function () {

            console.log('loginController - reset password');
            dataService.resetpassword($scope.emailAddressResetPassword).then(function (response) {
                if (response.success) {
                    console.log('reset password link has been set');
                    $scope.alerts.push({ type: 'success', msg: 'Reset Password Email Sent!' });
                } else {
                    console.log('reset password didn\'t go correctly');
                }
            });
        }
        /*
         * Handle the sucess message coming back from the Node service that hits Backendless.
         * Note we are doing a check in here for response body data that indicates a failure
         * authenticating with Backendless
         * TODO: Consider moving this logic into the Node endpoint for login to isolate this 
         * logic from the client
         */

        function handleSuccess(res) {
            var response;
            //check the data in the response - make sure we really have an auth
            //backendless will return res.data.code in the case of an authError
            if (res.data.code) {
                console.log(TAG + " handleSuccess, there is an error code from backEndless");
                return handleError(res);
            }
            //and there needs to be a unique ID to prove the auth
            if (!res.data.objectId) {
                console.log(TAG + " handleSuccess, there is no object ID on the response from BackEndLess");
                return handleError(res);
            }

            //send back the success
            response = { success: true, data: res };
            console.log(TAG + " handleSuccess: response = " + JSON.stringify(response));



            return response;
        }

        function handleError(res) {

            console.log("the error was = " + res.data.message);

            $scope.alerts.push({ type: 'danger', msg: res.data.message });

            return { success: false, message: res.data.message };
        }

    });