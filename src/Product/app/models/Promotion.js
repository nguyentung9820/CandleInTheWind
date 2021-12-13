const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promotion = new Schema({
    product_id: {type: Schema.Types.ObjectId},
    product_name : {type : String},
    promotion_description: { type: String},
    promotion_discount: { type: Number},
    available: { type: String },
    code: {type : String},
    expiredAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Promotion', Promotion);