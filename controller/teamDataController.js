var https = require('https');
var bodyParser = require('body-parser');
var teamData = require('../teamData');

module.exports = function(app){

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.get('/api/teams/:league',function(req,res){
        console.log('in the get endpoint for getting teams by league, league = ' + req.params.league);

        var teams= teamData.getTeamsByLeague(req.params.league);

                res.status('200').send(teams);
                                   
    });

    app.get('/api/pick-outcomes/:league',function(req,res){
        console.log('in the get endpoint for getting pick outcomes by league, league = ' + req.params.league);

        var pickOutcomes= teamData.getTeamOutcomesByLeague(req.params.league);
        
        console.log("pickOutcomes length = " + pickOutcomes.length);

        res.status('200').send(pickOutcomes);
                                   
    });

}