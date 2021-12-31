const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = new Schema({
    product_image: {type: String},
    product_name: { type: String},
    product_description: { type: String },
    product_sku: { type: String},
    product_price: { type: Number},
    product_type: { type: String },
    attribute_set: {type: String},
    attributes: {type: Array},
    qty: {type: Number},
    createdAt: { type: Date, default: Date.now},
    updateAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Product', Product);