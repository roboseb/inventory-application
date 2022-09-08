const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorldSchema = new Schema(
    {
        name: { type: String, required: true }
    }
);

// Virtual for world's URL
WorldSchema
  .virtual('url')
  .get(function() { // We don't use an arrow function as we'll need the this object
    return `/catalog/world/${this._id}`;
  });

//Export model
module.exports = mongoose.model('World', WorldSchema);