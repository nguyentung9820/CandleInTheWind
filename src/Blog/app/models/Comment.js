const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Blog = new Schema({
    postID: {type: String},
    caption: {type: String},
    createdAt: { type: Date, default: Date.now},
    updateAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('comments', Blog);