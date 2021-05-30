const mongoose = require('mongoose')
const Schema = mongoose.Schema

// book schema
const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    //adding the author id below to create one to many relationship
    author: {
        type: Schema.Types.ObjectId,
        ref: "Author",
        required: true
    }
})

module.exports = mongoose.model('Book', bookSchema)