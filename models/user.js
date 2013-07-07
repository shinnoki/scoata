var mongoose = require('mongoose')
  , findOrCreate = require('mongoose-findorcreate');

var UserSchema = new mongoose.Schema({
  username: String,
  twitter_id: Number,
  profile_image_url: String
});

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', UserSchema);
