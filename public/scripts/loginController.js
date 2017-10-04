'use strict';
angular.module("wagerCrony")
.controller('loginController', function ($scope,$http) {

  $scope.name = "Matt McMonigle";
  $scope.controllerName = "LoginController";

  var TAG = "loginController";

  $scope.username = "";
  $scope.password = "";

  $scope.login = function(){
    console.log('inside login function, username = ' + $scope.username + ', password = ' + $scope.password);

     return $http.post('/api/login/',{ "username": $scope.username, "password": $scope.password }).then(handleSuccess, handleError);



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
	   
	    return { success: false, message: res.data.message};
    }

});