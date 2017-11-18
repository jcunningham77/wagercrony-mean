var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var betSchema = new Schema({
    league:String,
    visitingTeam:String,
    homeTeam:String,
    eventDate: Date,
    wager:{ type: Number, min: 0, max: 1000 },
    result:{type:Number},
    user:String
});


var bet = mongoose.model('bet', betSchema);

module.exports = bet;


