const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CruddySchema = new Schema(
    {
        color: { type: String, required: true }
    }
);

//Export model
module.exports = mongoose.model('Cruddy', CruddySchema);
