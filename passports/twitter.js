var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy
  , config = require('config')
  , User = require('../models/user');

module.exports = new TwitterStrategy({
  consumerKey: config.twitter.consumerKey,
  consumerSecret: config.twitter.consumerSecret,
  callbackURL: config.twitter.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate({
      username: profile.username
    }, function(err, user, created) {
      user.profile_image_url = profile._json.profile_image_url;
      user.save();
      return done(null, user);
    });
  }
);
  

