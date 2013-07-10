var _ = require('underscore')
  , Record = require('../models/record');

module.exports = {
  index: function(req, res) {
    res.contentType('application/json');
    Record.find({}, function(err, records) {
      res.jsonp(records);
    });
  },
  add: function(req, res) {
    var record = new Record(req.body);
    record.user = req.user;
    record.save(function(err) {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.send(req.body);
      }
    });
  },
  ranking: function(req, res) {
    Record.find({item: req.params.item}, function(err, records) {
    });
  }
};
