const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Attribute = new Schema({
    attribute_name: {type: String},
    attributeset: {type: String},
    type: {type: String},
    options: {type: Array},
    created_at: { type: Date, default: Date.now},
    update_at: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Attribute', Attribute);