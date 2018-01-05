'use strict';
angular.module("wagerCrony")
.controller('formTestController', function ($scope) {
    $scope.email = {
        address: ""
    };

    $scope.emails = [];



    $scope.addEmail = function () {
        $scope.emails.push($scope.email);
        $scope.contacts.$setUntouched();
        $scope.email = {
            address: ""
        };
        $scope.selectedVegetables = "";
    };

    $scope.vegetables = ['Corn' ,'Onions' ,'Kale' ,'Arugula' ,'Peas', 'Zucchini'];
    $scope.searchTerm;
    $scope.clearSearchTerm = function() {
      $scope.searchTerm = '';
    };
    // The md-select directive eats keydown events for some quick select
    // logic. Since we have a search input here, we don't need that logic.
    // $element.find('input').on('keydown', function(ev) {
    //     ev.stopPropagation();
    // });

});