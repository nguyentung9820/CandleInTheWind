const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AttributeSet = new Schema({
    attribute_set_name: {type: String},
    active: {type: Number},
    attributeset_image: {type: String},
    created_at: { type: Date, default: Date.now},
    update_at: { type: Date, default: Date.now }
});


module.exports = mongoose.model('AttributeSet', AttributeSet);