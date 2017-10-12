(function() {
	'use strict';

	angular.module('wagerCrony',['ngRoute', 'ngCookies', 'ui.bootstrap','ngAnimate'])
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