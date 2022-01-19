const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promotion = new Schema({
    product_sku: {type: String},
    promotion_name: { type: String},
    promotion_description: { type: String},
    promotion_discount: { type: Number},
    qty: { type: Number },
    code: {type : String},
    expiredAt: { type: Date},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Promotion', Promotion);