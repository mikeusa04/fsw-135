const express = require('express');
const commentRouter = express.Router();
const Comment = require('../models/Comment.js')

//Get All Comments
commentRouter.get("/", (req, res, next) => {
    Comment.find((err, comments) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

commentRouter.post("/", (req, res, next) => {
    req.body.userID = req.user._id
    const newComment = new Comment(req.body)
    newComment.save((err, savedComment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedComment)
    })
})

module.exports = commentRouter