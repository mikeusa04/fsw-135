const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
    lowercase: true,
  },
  issueId: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("comment", commentSchema);