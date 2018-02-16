
var teamData = require('./teamData');
var teamOutcomeData = require('./teamOutcomeData');


module.exports = {
    getTeamsByLeague:function(league){
        console.log("in the teamData server side  - league = " + league);
        return teamData[0][league];             
    },

    getTeamOutcomesByLeague:function(league){
        console.log("in the teamData server side  - league = " + league);
        return teamOutcomeData[0][league];
    }
};