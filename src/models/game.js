//Game gameMODEL
var mongoose = require('mongoose');
/////////
//Constructor function
var GameSchema = new mongoose.Schema({
  
  geekId: Number,
  name: String,
  minPlyr: {type: Number},
  maxPlyr: Number,
  minTime: Number,
  maxTime: Number,
  yearPub: Number,
  imgUrl: String,
  description: String,
  rank: Number,
  weight: Number,
  mechanics: Array,
  categories: Array,
  designers: Array,
  artists: Array,
  publishers: Array,
  families: Array,
  dateUpdated: {type: Date, default: Date.now},
  isDeleted: {type: Boolean, default: false}
});
///////
module.exports = mongoose.model('Game', GameSchema);
