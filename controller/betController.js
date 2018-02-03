var https = require('https');
var Bet = require('../model/betModel');
var Pick = require('../model/pickModel');
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
                            createDate:Date(),
                            wager:req.body.data.wager,
                            result:req.body.data.result,
                            user:req.body.data.user
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

    app.get('/api/bets/:user',function(req,res){
        console.log('in the get endpoint for bet');

        Bet.find({ "user": req.params.user},function (err, bets) {
            if (err) {
                return console.error(err);
            } else {
                // console.log(bets);
                res.status('200').send(bets);
            }
                
        })
    });    

    app.post('/api/pick',function(req,res){
        console.log('in the post endpoint for pick, req = ' + req);
        var pick = new Pick({ league:req.body.data.league,
                            visitingTeam:req.body.data.visitingTeam,
                            homeTeam:req.body.data.homeTeam,
                            eventDate:new Date(req.body.data.eventDate),
                            description:req.body.data.description,
                            createDate:Date(),
                            creator:req.body.data.creator
                    });        

        pick.save(function(err, pick, numAffected){
            if (err){
                console.log(err);
                res.status('500').send(err);

            }else if(pick){
                console.log('successfully persisted ' + numAffected + ' pick = ' + pick);
                res.status('200').send(pick);
            }
        });       
    });

    app.put('/api/pick',function(req,res){
        console.log('in the put endpoint for pick, req = ' + JSON.stringify(req.body.data));
        var pick = {
                        league:req.body.data.league,
                        pickTeam:req.body.data.pickTeam,
                        pickLine:req.body.data.pickLine,
                        pickMoneyLine:req.body.data.pickMoneyLine,
                        result:req.body.data.result,        
                        visitingTeam:req.body.data.visitingTeam,
                        homeTeam:req.body.data.homeTeam,
                        eventDate:new Date(req.body.data.eventDate),
                        description:req.body.data.description,
                        creator:req.body.data.creator
                     };
        var options = {
            new: true
        }             
        Pick.findByIdAndUpdate(
            req.body.data._id,
            pick,
            options,
            function(err,doc) {
                    if (err){
                    console.log(err);
                    res.status('500').send(err);

                }else if(pick){
                    console.log('successfully updated this pick: ' + JSON.stringify(pick));
                    res.status('200').send(pick);
                }
            }
        );

    });

    app.get('/api/picks',function(req,res){
        console.log('in the get endpoint for picks');

        Pick.find(function (err, picks) {
            if (err) {
                return console.error(err);
            } else {
                // console.log(picks);
                res.status('200').send(picks);
            }
                
        })
    });    

};
