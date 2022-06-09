const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  newsType: {
    type: String,
    required: true,
  },
  postTime: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
});

module.exports = mongoose.model("news", NewsSchema);
