
var data = require('./data');


module.exports = {
 getTeamsByLeague:function(league){

        console.log("in the teamData server side  - league = " + league);

        return data[0][league];
        
        
    }
};