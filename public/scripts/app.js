(function() {
	'use strict';

	angular.module('wagerCrony',['ngRoute', 'ngCookies', 'ui.bootstrap','ngAnimate', 'ngMaterial', 'ngMessages'])
	.config(function($mdIconProvider) {
		$mdIconProvider
			.iconSet('editor', 'img/icons/sets/editor-icons.svg', 24)
			.iconSet('social', 'img/icons/sets/social-icons.svg', 24)
			.iconSet('device', 'img/icons/sets/device-icons.svg', 24)
			.iconSet('communication', 'img/icons/sets/communication-icons.svg', 24)
			.defaultIconSet('img/icons/sets/core-icons.svg', 24);			
	}).directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover'
        });
    };
}).directive('searchInputTextFieldSelectList',function(){
			var controller = ['$scope','$element', function ($scope,$element) {
          $element.find('input').on('keydown', function(ev) {
          	ev.stopPropagation();
      		});

					$scope.clearSearchTermTeams = function() {
						$scope.searchTermTeamInput = '';
						console.log("searchInputTextFieldSelectList directive, clearsearchTermTeams cleared.")
					};

					$scope.validateParentForm = function(){
						console.log('validateParentForm: directive function called');
						$scope.validate();
					}
      }],
        
			template = 

									'<md-input-container>'+
										'<label>{{label}}</label>'+
										'<md-select ng-model="selectedItem" id={{label}} name={{name}} '+
											'md-on-close="clearSearchTermTeams();validateParentForm();" '+
											'data-md-container-class="selectdemoSelectHeader" '+
											'multiple="false" required> '+
											'<div class="errors" ng-messages="trackForm.selectedItem.$error">'+
												'<div ng-message="required">This field is required</div>'+
											'</div>'+
											'<md-select-header class="demo-select-header">'+
												'<input id=searchTermTeamInput ng-model="searchTermTeamInput"'+
													'type="search"'+
													'placeholder="{{label2}}"'+
													'class="demo-header-searchbox md-text">'+

											'</md-select-header>'+
											'<md-optgroup label="item">'+
											'<md-option ng-value="item.name" ng-repeat="item in items|filter:searchTermTeamInput">{{item.name}}</md-option>'+
											'</md-optgroup>'+
										'</md-select>'+
									'</md-input-container>'

			return{
				required: '^ngModel',
				scope:{
					
					visible: '=',
					label: '@',
					label2: '@',
					name: '@',
					items: '=',
					selectedItem:  '=bind',
					validate: "&"

				},
				template: template,
				controller: controller
                  
			}

		})
		.directive( 'clickNav', function ( $location ) {
			return function ( scope, element, attrs ) {
				var path;

				attrs.$observe( 'clickNav', function (val) {
					path = val;
				});

				element.bind( 'click', function () {
					scope.$apply( function () {
						$location.path( path );
					});
				});
			};
		})
		.config(function($mdThemingProvider) {
			$mdThemingProvider.theme('default');
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
		  .when('/FormTest', {				
		    templateUrl: 'templates/formTest.html',
		    controller: 'formTestController'

		  }) 			 			 			  			  		  
		  .otherwise({ redirectTo: '/Login' });
		})



		
.run(run);


run.$inject = ['$rootScope', '$location', '$cookies', '$http', 'authenticationService'];
	function run($rootScope, $location, $cookies, $http, authenticationService) {
        // keep user logged in after page refresh
				// debugger;
				
				console.log('app.js, run(), this is value of globals cookie = ', $cookies.getObject('globals'));
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
						console.log("run - current user appears to be defined");
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
        	console.log("event = " + event);
        	console.log("next = " + next);
					console.log("current = " + current);
					console.log("$location.path = " + $location.path());
					$rootScope.location  = $location.path();
					// debugger;
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/Login', '/Register', '/About','FormTest']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
						
						
						if (restrictedPage && !loggedIn) {
                $location.path('/Login');
						} 

						if ($location.path()===''&&loggedIn){
							$location.path('/Picks');
						}
        });
    }
		
})();