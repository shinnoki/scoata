/*
 * GET users listing.
 */
var User = require('../models/user');

module.exports = {
  index: function(req, res) {
    res.contentType('application/json');
    User.find({}, function(err, users) {
      res.jsonp(users);
    });
  },
  show: function(req, res) {
    res.contentType('application/json');
    User.findById(req.params.id, function(err, user) {
      res.jsonp(user);
    });
  }
};
