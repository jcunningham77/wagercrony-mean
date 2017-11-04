var configValues = require('./config');
var backendlessConfigValues = require('./backendless');

module.exports = {
    getDBConnectionString:function(){
        return 'mongodb://'+ configValues.uname+':'+configValues.password+'@ds153652.mlab.com:53652/wagercrony';
    
    },

    getBackendlessConfigValues:function(){

        return backendlessConfigValues;
    }

    
};