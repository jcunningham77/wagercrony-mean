var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var pickSchema = new Schema({
    league:String,
    visitingTeam:String,
    homeTeam:String,
    eventDate: Date,
    description:String,
    createDate:Date
});


var pick = mongoose.model('pick', pickSchema);

module.exports = pick;


