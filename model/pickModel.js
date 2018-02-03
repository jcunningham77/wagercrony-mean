var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var pickSchema = new Schema({
    pickTeam:String,
    pickLine:String,
    pineMoneyLine:String,
    result:{ type: Number, min: -1, max: 1 },
    league:String,
    visitingTeam:String,
    homeTeam:String,
    eventDate: Date,
    description:String,
    createDate:Date,
    creator:String
});


var pick = mongoose.model('pick', pickSchema);

module.exports = pick;


