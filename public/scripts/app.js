(function() {
	'use strict';

	angular.module('wagerCrony',['ngRoute', 'ngCookies', 'ui.bootstrap','ngAnimate', 'ngMaterial', 'ngMessages'])
		.directive('searchInputTextFieldSelectList',function(){
			var controller = ['$scope','$element', function ($scope,$element) {
          $element.find('input').on('keydown', function(ev) {
          	ev.stopPropagation();
      		});
      }],
        
      // template = '<input id=searchTermTeamInput ng-model="searchTerm" type="search" placeholder="Search for a team.." ' +
			// 	'class="demo-header-searchbox md-text">'
			template = 

						'<div class="md-padding" ng-cloak {{visible}}>'+
							'<div>'+
								'<div layout="row">'+
									'<md-input-container>'+
										'<label>Visiting Team</label>'+
										'<md-select ng-model="selectedItem" '+
											'md-on-close="clearSearchTerm()" '+
											'data-md-container-class="selectdemoSelectHeader" '+
											'multiple="false"> '+
											'<md-select-header class="demo-select-header">'+
												'<input id=searchTermTeamInput ng-model="searchTerm"'+
													'type="search"'+
													'placeholder="Search for a team.."'+
													'class="demo-header-searchbox md-text">'+

											'</md-select-header>'+
											'<md-optgroup label="item">'+
											'<md-option ng-value="item.name" ng-repeat="item in items|filter:searchTerm">{{item.name}}</md-option>'+
											'</md-optgroup>'+
										'</md-select>'+
									'</md-input-container>'+
								'</div>'+
							'</div>'+
						'</div>'	

			return{
				required: '^ngModel',
				scope:{
					
					visible: '=',
					label: '@',
					items: '=',
					selectedItem:  "=ngModel"

				},
				template: template,
				controller: controller
                  
			}

		})
    .config(function($routeProvider){
		$routeProvider

		   .when('/Login', {
		    templateUrl: 'templates/login.html',
		    controller: 'loginController'
		    	    
		  })
		  .when('/Picks', {
		    templateUrl: 'templates/picks.html',
		    controller: 'picksController'

		  }) 
		  .when('/Track', {
		    templateUrl: 'templates/track.html',
		    controller: 'trackController'

		  })		  
		  .when('/About', {				
		    templateUrl: 'templates/about.html',
		    controller: 'aboutController'

		  })	
		  .when('/Hedge', {				
		    templateUrl: 'templates/hedge.html',
		    controller: 'hedgeController'

		  })        
		  .when('/Register', {				
		    templateUrl: 'templates/register.html',
		    controller: 'registerController'

		  })       
		  .when('/Admin', {				
		    templateUrl: 'templates/admin.html',
		    controller: 'adminController'

		  })  			 			  			  		  
		  .otherwise({ redirectTo: '/Login' });
		})



		
.run(run);


run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', 'authenticationService'];
	function run($rootScope, $location, $cookieStore, $http, authenticationService) {
        // keep user logged in after page refresh
        // debugger;
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
						console.log("run - current user appears to be defined");
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
        	console.log("event = " + event);
        	console.log("next = " + next);
        	console.log("current = " + current);
					// debugger;
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/Login', '/Register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/Login');
						}
        });
    }
		
})();