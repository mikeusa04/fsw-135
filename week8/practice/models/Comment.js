const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    issue: {
        type: Schema.Types.ObjectId,
        ref: "Issue",
        requried: true
    }
    
});

module.exports = mongoose.model('Comment', CommentSchema)