const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
    userID:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true 
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model( "Issue", issueSchema )