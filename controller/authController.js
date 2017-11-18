/*
    This controller handles authentication functionality for client requests.
    This will initially be used by an Angular front end, but may be used by other clients at some point.
    The current BES is BackEndLess - currently sending back backEndless-specific response data that determines authentication status.
    For example, we will get a 200 from BackEndLess, but need to inspect the response body to make sure there is a success authentication or registration
    TODO - handle this login in this layer so clients don't have to do the authentication. 
*/

var https = require('https');
var bodyParser = require('body-parser');
var config = require('../config');



module.exports = function(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    var backendlessHeaders = config.getBackendlessConfigValues();

    app.get('/api/resetpassword/:email',function(req,res){
        console.log("About to request password reset from backendless for email = " + req.params.email);
        
        console.log("headers = " + JSON.stringify(backendlessHeaders));
        var request1 = https.request({method:'GET',
                      headers : backendlessHeaders,
                      host:'api.backendless.com',
                      path:'/v1/users/restorepassword/' + req.params.email
                      },function(result){
                          var body= "";
                            result.on('data', function(d) {
                                console.log("in data callback of BE reset");
                                body += d;
                                
                            });
                            result.on('end',function(){
                                console.log("in end callback of BE reset");
                                console.log('statusCode:', result.statusCode);
                                console.log('data:', result.data);
                                
                                res.send(result.statusCode);
                                
                            });
                            result.on('error',function(){
                                if (err){
                                    console.log("in error callback of BE reset");
                                    console.log(err);
                                    throw err;
                                }
                            });

                      });
                      request1.end();
    });

    app.post('/api/login',function(req,res){
   
            console.log("about to invoke Backendless login API call, username = " + req.body.username + " and password = " + req.body.password);
            

            var data = {
                "login" : req.body.username,
                "password" : req.body.password
            }          
        
            var request1 = https.request({method:'POST',
                      headers : backendlessHeaders,
                      host:'api.backendless.com',
                      path:'/'+backendlessHeaders.applicationId+'/'+backendlessHeaders.apiKey+'/users/login'
                      },function(result){
                          
                          var parsed;
                           var body = '';
                            result.on('data', function(d) {
                                body += d;
                            });
                            result.on('end',function(){
                                parsed = JSON.parse(body);
                                console.log('in authController node endpoint for login - end ' + JSON.stringify(parsed));
                                res.send(parsed);
                            });
                            result.on('error',function(){
                                if (err){
                                    console.log('in authController node endpoint for login - error - ' + err);
                                    console.log(err);
                                    throw err;
                                }
                            });

                      });
                     console.log("data = " + JSON.stringify(data));
                      request1.write(JSON.stringify(data));
                      
                      request1.end();
    });

    app.post('/api/register',function(req,res){
   
            var user = {
                email:req.body.email,
                password:req.body.password
            }

            console.log("about to invoke Backendless registration API call, user = " + JSON.stringify(user));      
        
            var request1 = https.request({method:'POST',
                      headers : backendlessHeaders,
                      host:'api.backendless.com',                
                      path:'/'+backendlessHeaders.applicationId+'/'+backendlessHeaders.apiKey+'/users/register'

                      },function(result){
                          
                          var parsed;
                           var body = '';
                            result.on('data', function(d) {
                                body += d;
                            });
                            result.on('end',function(){
                                console.log('in end clause of backendless register post callback - body = ' + body);
                                parsed = JSON.parse(body);
                                res.send(parsed);
                            });
                            result.on('error',function(){
                                if (err){
                                    console.log('in authController node endpoint for register - error - ' + err);
                                    console.log(err);
                                    throw err;
                                }
                            });

                      });                     
                      request1.write(JSON.stringify(user));                      
                      request1.end();
    });
}