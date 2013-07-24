var _ = require('underscore')
  , Record = require('../models/record');

module.exports = {
  index: function(req, res) {
    res.contentType('application/json');
    if (req.query.item) {
      Record.find({item: req.query.item})
      .populate('user', 'name profile_image_url')
      .exec(function(err, records) {
        res.jsonp(records);
      });
    } else {
      Record.find({}, function(err, records) {
        res.jsonp(records);
      });
    }
  },
  add: function(req, res) {
    var record = new Record(req.body);
    record.user = req.user;
    record.save(function(err, product) {
      if (err) {
        console.log(err);
        res.send(402, err);
      } else {
        Record.findOne(product)
        .populate('user', 'name profile_image_url')
        .exec(function(err, data) {
          res.jsonp(data);
        });
      }
    });
  },
  remove: function(req, res) {
    Record.findById(req.params.id, function(err, record) {
      if (err) {
        console.log(err);
        res.send(400, err);
      } else if (req.user == undefined ||
          record.user != undefined &&
          !record.user.equals(req.user._id)) {
        res.send(402);
      } else {
        record.remove(function () {
          res.send(200);
        });
      }
    });
  }
};
