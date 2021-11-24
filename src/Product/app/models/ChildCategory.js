const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ChildCategory = new Schema({
    child_category: {type: String},
    parent: {type: String},
    created_at: { type: Date, default: Date.now},
    update_at: { type: Date, default: Date.now }
});


module.exports = mongoose.model('ChildCategorie', ChildCategory);