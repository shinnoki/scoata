var Item = require('../models/item');

module.exports = {
  index: function(req, res) {
    res.contentType('application/json');
    Item.find({}, function(err, items) {
      res.jsonp(items);
    });
  },
  show: function(req, res) {
    res.contentType('application/json');
    Item.findById(req.params.id)
      .populate('created_by')
      .exec(function(err, item) {
        res.jsonp(item);
      });
  },
  add: function(req, res) {
    var item = new Item(req.body);
    item.created_by = req.user,
    item.save(function(err) {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.send(req.body);
      }
    });
  },
  remove: function(req, res) {
    Item.findById(req.params.id, function(err, item) {
      if (err) {
        console.log(err);
        res.send(400, err);
      } else if (req.user == undefined ||
          item.created_by != undefined &&
          !item.created_by.equals(req.user._id)) {
        console.log(req.user._id);
        console.log(item.created_by);
        res.send(402);
      } else {
        item.remove(function () {
          res.send(200);
        });
      }
    });
  }
};
