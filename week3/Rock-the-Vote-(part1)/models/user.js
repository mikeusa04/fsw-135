const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  memberSince: {   //this is for loyalty member only
    type: Date,
    default: Date.now
  },
  isAdmin: {      //this is to separat admin from users
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model("User", userSchema);