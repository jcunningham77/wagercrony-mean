angular.module('wagerCrony').controller('AlertCtrl', function ($scope) {
  // $scope.alerts = [
  //   { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
  //   { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
  // ];

  // $scope.addAlert = function() {
  //   $scope.alerts.push({msg: 'Another alert!'});
  // };

  $scope.closeAlert = function(index) {
    
    console.log("AlertsController, close alert");
    // $parent.alerts.splice(index, 1);
    $scope.$parent.alerts.splice(index, 1);
  };
});