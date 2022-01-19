const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Order = new Schema({
    billing_firstname: {type: String},
    billing_lastname: {type: String},
    billing_company: { type: String},
    billing_address: { type: String },
    billing_phone: { type: String},
    billing_city: { type: String},
    billing_additional: { type: String },
    billing_email: { type: String },
    shipping_firstname: { type: String },
    shipping_lastname: { type: String },
    shipping_address: { type: String },
    shipping_city: { type: String },
    shipping_phone: { type: String },
    shipping_additional: { type: String },
    shipping_method: { type: String },
    coupon_code: { type: String },
    product_list: { type: Array },
    discount: { type: String },
    bill_total: { type: String },
    last_total: { type: String },
    money_discount: { type: String },
    status: { type: String },
    customer_id: { type: String },
    invoice: {type: String},
    point_used: {type: Number},
    createdAt: { type: Date, default: Date.now},
    updateAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Order', Order);