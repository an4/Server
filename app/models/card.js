var mongoose = require('mongoose');

var cardSchema = mongoose.Schema({
    title : { type : String, required: true},
    text : { type : String, required: true},
    date : { type: String, required: true},
    color : { type: String, required: true}
});

module.exports = mongoose.model('Card', cardSchema);;
