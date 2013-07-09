var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var ItemSchema = new Schema({
  id: {
    type: Number
  },
  name: {
    type: String,
    required: true,
    unique: true,
    validate: [function(v) {
        return v.length < 20;
      }, 'MaxNameLength']
  },
  minValue: {
    type: Number
  },
  maxValue: {
    type: Number
  },
  description: {
    type: String
  },
  tags: {
    type: String
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Item', ItemSchema);
