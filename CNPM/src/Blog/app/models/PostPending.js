const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postPending = new Schema({
  username: { type: String },
  postID: { type: String },
  caption: { type: String },
  image: { type: String },
  idAuthor: {type: String},
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("postpendings", postPending);
