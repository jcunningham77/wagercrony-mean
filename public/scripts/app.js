(function() {
	'use strict';

	angular.module('wagerCrony',['ngRoute'])
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


	function run() {
        console.log("hell0");
    }

    })();