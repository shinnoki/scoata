var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy
  , config = require('config')
  , User = require('../models/user');

module.exports = new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY || config.twitter.consumerKey,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET || config.twitter.consumerSecret,
  callbackURL: process.env.TWITTER_CALLBACK_URL || config.twitter.callbackURL
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
  

