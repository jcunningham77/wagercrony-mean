'use strict';
angular.module("wagerCrony")
.controller('loginController', function ($scope,$http, $location, dataService, authenticationService, $animate) {

  $scope.name = "Matt McMonigle";
  $scope.controllerName = "LoginController";

  var TAG = "loginController";

  $scope.username = "";
  $scope.password = "";

  $scope.alerts = [
    
  ];



//   function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
//   }
  
//   function demo(ms) {
//     console.log('Taking a break...');
//     await sleep(ms);
//     console.log('Two second later');
//   }
  
 

  $scope.login = function(){
      dataService.login($scope.emailAddress,$scope.password).then(function(response) {
                if (response.success) {
                
                    console.log("LoginController.login, success response data = " + JSON.stringify(response.data));
                    // debugger;
                    
                    // console.log("LoginController.login - data from response to be stored in auth:");
                    console.log("email:" + response.data.config.data.username);
                    console.log("pw:" + response.data.config.data.password);
                    authenticationService.SetCredentials(response.data);
                    // vm.dataLoading = false;
                    // debugger;
                    // var element = angular.element(document.getElementByName('submitButton'));
                    var element = angular.element(document.getElementById('submitButton'));

                    
                    console.log("loginController, login success, about to apply animation - time = " + new Date().toLocaleTimeString());
                    // element.addClass('css-class'); 
                    $animate.addClass(element,'move_up').then(function(){
                        debugger;
                        console.log('remove move_up');
                        console.log("loginController, login success, about to remove animation - time = " + new Date().toLocaleTimeString());
                        $animate.removeClass(element, 'move_up');
                        $location.path('/Track');
                    });
                    // demo(2000);
                    
                    // setTimeout(function() {
                    //     console.log("loginController, login success, after setTimeout= " + new Date().toLocaleTimeString());
                    //     console.log("loginController, login success, about to navigate to track page = " + new Date().toLocaleTimeString());
                        
                    // }, (3 * 1000));
                    

                    
                } else {
                    // debugger;
                    var element = angular.element(document).find(loginForm);
                    console.log('add shake class');
                    console.log("loginController, login failure, about to apply shake animation - time = " + new Date().toLocaleTimeString());
                    $animate.addClass(element, 'shake').then(function() {
                        debugger;
                        console.log("loginController, login failure, about to remove shake animation - time = " + new Date().toLocaleTimeString());
                        console.log('remove shake class');
                        $animate.removeClass(element, 'shake');
                      });

                    console.log("loginController, login failure, about to pop alert time = " + new Date().toLocaleTimeString());  
                    $scope.alerts.push({type: 'danger',msg: response.message});
                    console.log("LoginController.login, response is failure, message from Backendless = " + response.message);
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