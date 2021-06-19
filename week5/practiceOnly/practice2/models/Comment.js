const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    } 
});

module.exports = mongoose.model('Comment', CommentSchema)