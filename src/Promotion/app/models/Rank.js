const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Rank = new Schema({
    rank_name: {type: String},
    rank_description: { type: String},
    rank_point: { type: String},
    rank_image: { type: String},
    level: {type: String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Rank', Rank);