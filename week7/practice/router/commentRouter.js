const express = require('express');
const commentRouter = express.Router();
const Comment = require('../models/Comment.js')

// Get Comments by issueID
commentRouter.get("/issue/:issue", (req, res, next) => {
    Comment.find({ issue: req.params.issue }, (err, issues) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
})

commentRouter.post("/", (req, res, next) => {
    req.body.user = req.user._id
    console.log(req.body);
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