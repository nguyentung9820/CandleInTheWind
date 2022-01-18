const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PendingRequest = new Schema({
    userid: {type: String},
    username: {type: String},
    customer_group: { type: String },
    createdAt: { type: Date, default: Date.now},
    updateAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('PendingRequest', PendingRequest);