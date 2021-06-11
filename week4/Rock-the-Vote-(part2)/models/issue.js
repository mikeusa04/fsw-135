const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    default: 0,
    required: true
  },
  username: {                 // user has relation with many comments= one to many relations
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("Issue", issueSchema);