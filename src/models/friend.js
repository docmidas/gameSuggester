//RATING MODEL
var mongoose = require('mongoose');
var Schema =  mongoose.Schema;
// var User            = require(__dirname + '/../models/user'),
// var Game            = require(__dirname + '/../models/game');
////////
//Constructor function
var FriendSchema = new mongoose.Schema({
  status: String,
  dateCreated: {type: Date, default: Date.now},
  isDeleted: {type: Boolean, default: false},
  friender: {type: Schema.Types.ObjectId, ref: 'User'},
  friendee: {type: Schema.Types.ObjectId, ref: 'User'}

});
/////////


FriendSchema.statics.printStuff = function (par) {
  return ("Im a static function " + par);
}

FriendSchema.statics.checkIfFriends = function (frienderId, friendeeId, cb) {
  // return "Running checkIfFriends";


  // this.findOne({friendee: friendee}, function (err, data){ //Find ALL things within database
  //   return (data);
  // });

 
  //return this.find({ friender: frienderId, friendee: friendeeId }, cb);
  return this.findOne({$or: [{friender: frienderId, friendee: friendeeId}, {friender: friendeeId, friendee: frienderId}]}, cb);
}



module.exports = mongoose.model('Friend', FriendSchema);
