//USER MODEL
var mongoose = require('mongoose');

////////
//Constructor function
var UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  geekName: String,
  contact: Boolean,
  dateCreated: {type: Date, default: Date.now},
  isDeleted: {type: Boolean, default: false}
  // items: [{type: Schema.Types.ObjectId, ref: 'Item'}]
});
/////////
module.exports = mongoose.model('User', UserSchema);
