const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Customer = new Schema({
    avatar: {type: String},
    username: {type: String},
    password: { type: String},
    email: { type: String },
    phone: { type: Number},
    address: { type: String},
    customer_group: { type: String },
    createdAt: { type: Date, default: Date.now},
    updateAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Customer', Customer);