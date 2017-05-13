 var express = require('express');
 
 var app =express();
 var port = 3000;
 var ip = 'localhost';
 



app.use('/assets/',express.static(__dirname+'/public'));

 


console.log('ip = ' + ip);
console.log('port = ' + port);
app.listen(port, ip,function(){
     console.log(new Date() + ' Server is listening on port 8080');
});