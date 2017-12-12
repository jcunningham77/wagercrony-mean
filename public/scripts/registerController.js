angular.module('wagerCrony').controller('registerController', function ($scope, $location, dataService,authenticationService) {
  // debugger;
 $scope.controllerName = "RegisterController";

 $scope.alerts = [
    
  ];

 $scope.register = function(){

        dataService.register($scope.email,$scope.password,$scope.customerName).then(function(response) {
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
                    
                    $scope.alerts.push({type: 'danger',msg: response.message});
                    console.log("registerController.login, response is failure, message from Backendless = " + response.message);
                    //TODO work on flash service for error feedback
              // flashService.Error(response.message);
                    // vm.password="";
                    // vm.dataLoading = false;
                }
            });   

 }


});