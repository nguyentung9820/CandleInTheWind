const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Blog = new Schema({
  username: { type: String },
  postID: { type: String },
  caption: { type: String },
  title: { type: String},
  image: { type: String },
  idAuthor: {type: String},
  availableToCmt: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("posts", Blog);
