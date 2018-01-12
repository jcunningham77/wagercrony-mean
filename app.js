var express = require('express');
var config = require('./config');
var mongoose = require('mongoose');
 
var app =express();



console.log("startup, config.getNodeConfigValue().port = " + config.getNodeConfigValue().port);
console.log("startup, config.getNodeConfigValue().ip = " + config.getNodeConfigValue().ip);
var port =  config.getNodeConfigValue().port;
var ip = config.getNodeConfigValue().ip;




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