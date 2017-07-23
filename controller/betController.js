var https = require('https');
var Bet = require('../model/betModel');
var bodyParser = require('body-parser');


module.exports = function(app){

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

     app.post('/api/bet',function(req,res){
        console.log('in the post endpoint for bet');

       

        var bet = new Bet({ league:req.body.data.league,
                            visitingTeam:req.body.data.visitingTeam,
                            homeTeam:req.body.data.homeTeam,
                            eventDate:new Date(req.body.data.eventDate),
                            wager:req.body.data.wager,
                            result:req.body.data.result
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
