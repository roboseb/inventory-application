const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema(
    {
        type: { type: String, required: true },
        layers: [],
        locked: {type: Boolean}
    }
);

//Export model
module.exports = mongoose.model('Item', ItemSchema);
