//USER MODEL
var mongoose = require('mongoose');

////////
//Constructor function
var UserSchema = new mongoose.Schema({
  avatar: String,
  username: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  geekName: String,
  contact: Boolean,
  permissions: {type: String, default: "user"},
  dateCreated: {type: Date, default: Date.now},
  isDeleted: {type: Boolean, default: false}
});
/////////
module.exports = mongoose.model('User', UserSchema);
