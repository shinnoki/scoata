var mongoose = require('mongoose')
  , findOrCreate = require('mongoose-findorcreate');

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  twitter_id: {
    type: Number
  },
  profile_image_url: {
    type: String
  }
});

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', UserSchema);
