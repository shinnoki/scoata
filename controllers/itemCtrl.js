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
    // Item.findById(req.params.id, function(err, item) {
    //   Item.populate(item, 'created_by', function() {
    //     res.jsonp(item);
    //   });
    // });
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
    Item.findByIdAndRemove(req.params.id, function(err) {
      if (err) {
        res.send(err);
        console.log(err);
      } else {
        res.send(req.body);
      }
    });
  }
};
