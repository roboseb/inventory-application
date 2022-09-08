const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CruddySchema = new Schema(
    {
        color: { type: String, required: true },
        world: [{ type: Object, ref: 'World' }]
    }
);

//Export model
module.exports = mongoose.model('Cruddy', CruddySchema);
