const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = new Schema({
    product_category: {type: String},
    active: {type: Number},
    category_image: {type: String},
    created_at: { type: Date, default: Date.now},
    update_at: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Categorie', Category);