//RATING MODEL
var mongoose = require('mongoose');
var Schema =  mongoose.Schema;
// var User            = require(__dirname + '/../models/user'),
// var Game            = require(__dirname + '/../models/game');
////////
//Constructor function
var ItemSchema = new mongoose.Schema({
  rating: Number,
  status: String,
  dateCreated: {type: Date, default: Date.now},
  isDeleted: {type: Boolean, default: false},
  userId: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  game: {type: Schema.Types.ObjectId, ref: 'Game'}

});
/////////
module.exports = mongoose.model('Item', ItemSchema);

