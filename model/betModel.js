var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var betSchema = new Schema({
    league:String,
    visitingTeam:String,
    homeTeam:String,
    eventDate: Date,
    createDate: Date,
    wager:{ type: Number, min: 0, max: 10000 },
    result:{ type: Number, min: 0, max: 10000 },
    user:String
});


var bet = mongoose.model('bet', betSchema);

module.exports = bet;


