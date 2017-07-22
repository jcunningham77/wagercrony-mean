var https = require('https');
var bodyParser = require('body-parser');
var Bet = require('../model/betModel');
var bodyParser = require('body-parser');

module.exports = function(app){

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

     app.post('/api/bet',function(req,res){
        console.log('in the post endpoint for bet');
        
        var bet = new Bet({   league:'NHL',
                                visitingTeam:'Edmonton Oilers',
                                homeTeam:'Los Angeles Kings',
                                gameDate:new Date(2016,2,24),
                                wager:100,
                                result:-150
                    });

        bet.save(function(err, bet, numAffected){
            if (err){
                console.log(err);
                res.status('500').send(err);

            }else if(bet){
                console.log('successfully persisted ' + numAffected + ' bet = ' + bet);
                res.status('200').send(bet);
            }
        });       
    });

};
