const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Blog = new Schema({
    username: {type: String},
    password: { type: String},
    comment: { type: String },
    createdAt: { type: Date, default: Date.now},
    updateAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Blog', Blog);