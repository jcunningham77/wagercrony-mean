var https = require('https');
var bodyParser = require('body-parser');
var teamData = require('../teamData');

module.exports = function(app){

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.get('/api/teams/:league',function(req,res){
        console.log('in the get endpoint for getting teams by league, league = ' + req.params.league);

        var teams= teamData.getTeamsByLeague(req.params.league);



        // var teams = [
        //           {"name":"Anaheim Ducks"},
        //           {"name":"Arizona Coyotes"},
        //           {"name":"Boston Bruins"},
        //           {"name":"Buffalo Sabres"},
        //           {"name":"Calgary Flames"},
        //           {"name":"Carolina Hurricanes"},
        //           {"name":"Chicago Blackhawks"},
        //           {"name":"Colorado Avalanche"},
        //           {"name":"Columbus Blue Jackets"},
        //           {"name":"Dallas Stars"},
        //           {"name":"Detroit Red Wings"},
        //           {"name":"Edmonton Oilers"},
        //           {"name":"Florida Panthers"},
        //           {"name":"Los Angeles Kings"},
        //           {"name":"Minnesota Wild"},
        //           {"name":"Montreal Canadiens"},
        //           {"name":"Nashville Predators"},
        //           {"name":"New Jersey Devils"},
        //           {"name":"New York Islanders"},
        //           {"name":"New York Rangers"},
        //           {"name":"Ottawa Senators"},
        //           {"name":"Philadelphia Flyers"},
        //           {"name":"Pittsburgh Penguins"},
        //           {"name":"San Jose Sharks"},
        //           {"name":"St. Louis Blues"},
        //           {"name":"Tampa Bay Lightning"},
        //           {"name":"Toronto Maple Leafs"},
        //           {"name":"Vancouver Canucks"},
        //           {"name":"Washington Capitals"},
        //           {"name":"Winnipeg Jets"}
        //         ]


                res.status('200').send(teams);
                                   
    });


}