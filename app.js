var express = require('express');
var config = require('./config');
var mongoose = require('mongoose');
 
var app =express();


//heroku settings
var port = process.env.PORT|| 8081;
var ip = '0.0.0.0';
console.log("port: " + port);
console.log("ip: " + ip); 



app.use('/assets/',express.static(__dirname+'/public'));
mongoose.connect(config.getDBConnectionString());
var teamDataController = require('./controller/teamDataController');
var betController = require('./controller/betController');
var authController = require('./controller/authController');
teamDataController(app);
betController(app);
authController(app);
 


console.log('ip = ' + ip);
console.log('port = ' + port);
console.log('hello jeff - troubleshooting');
app.listen(port, ip,function(){
     console.log(new Date() + ' Server is listening on port :' + port);
});