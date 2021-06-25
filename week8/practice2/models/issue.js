const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const issueSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: false,
  },
  upVotes: {
    type: Number,
    default: 0,
  },
  downVotes: {
    type: Number,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  postDate: {
    type: String,
    required: true,
    default: Date.now,
  },
});
module.exports = mongoose.model("issue", issueSchema);