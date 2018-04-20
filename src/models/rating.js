//RATING MODEL
var mongoose = require('mongoose');
// var User            = require(__dirname + '/../models/user'),
// var Game            = require(__dirname + '/../models/game');
////////
//Constructor function
var RatingSchema = new mongoose.Schema({
  score: Number,
  dateCreated: {type: Date, default: Date.now},
  isDeleted: {type: Boolean, default: false},
  userId: String,
  geekId: Number  
//////////Advanced populating?
  // _creator: {type: Schema.ObjectId, ref: 'User'},
  // _game: {type: Schema.ObjectId, ref: 'Game'}
});
/////////
module.exports = mongoose.model('Rating', RatingSchema);
