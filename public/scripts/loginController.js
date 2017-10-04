'use strict';
angular.module("wagerCrony")
.controller('loginController', function ($scope,$http, $location, dataService) {

  $scope.name = "Matt McMonigle";
  $scope.controllerName = "LoginController";

  var TAG = "loginController";

  $scope.username = "";
  $scope.password = "";

  $scope.alerts = [
    
  ];

  $scope.addAlert = function() {
    $scope.alerts.push({msg: 'Another alert!'});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };  

  $scope.login = function(){
      dataService.login($scope.username,$scope.password).then(function(response) {
                if (response.success) {
                
                    console.log("LoginController.login, success response data = " + JSON.stringify(response.data));

                    // authenticationService.SetCredentials(username, password);
                    // console.log("LoginController.login - data from response to be stored in auth:");
                    // console.log("email:" + response.data.config.data.email);
                    // console.log("pw:" + response.data.config.data.password);
                    // authenticationService.SetCredentials(response.data.config.data.email, response.data.config.data.password);
                    // vm.dataLoading = false;

                    $location.path('/Track');
                } else {

                    $scope.alerts.push({type: 'danger',msg: response.message});
                    console.log("LoginController.login, response is failure, message from Backendless = " + response.message);
                    //TODO work on flash service for error feedback
              // flashService.Error(response.message);
                    // vm.password="";
                    // vm.dataLoading = false;
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
        if (res.data.code){
            console.log(TAG + " handleSuccess, there is an error code from backEndless");
            return handleError(res);
        }
        //and there needs to be a unique ID to prove the auth
        if (!res.data.objectId){
            console.log(TAG + " handleSuccess, there is no object ID on the response from BackEndLess");
            return handleError(res);
        }

        //send back the success
        response = { success: true,data:res };
        console.log(TAG + " handleSuccess: response = " + JSON.stringify(response));



        return  response;
    }	

    function handleError(res) {
	    
	    console.log("the error was = " + res.data.message);

      $scope.alerts.push({type: 'danger',msg: res.data.message});
	   
	    return { success: false, message: res.data.message};
    }

});