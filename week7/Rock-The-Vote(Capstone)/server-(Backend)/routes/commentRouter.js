const express = require('express')
const commentRouter = express.Router()
const Comment = require("../models/comment.js")

//Get all
commentRouter.get('/', (req, res, next) => {
    Comment.find((err, comments) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(comments)
    })
  })

  /*Get one
  commentRouter.get('/:commentId', (req, res, next) => {
      Comment.findById(req.params.commentId, (err, comment) =>{
          if(err){
              res.status(500)
              return next(err)
          }
          return res.status(201).send(comment)
      })
  })*/

//Get one
  commentRouter.get('/issue/:issueID', (req, res, next) => {
      console.log(req.params.issueID)
      console.log('router')
      Comment.find({ issueId: req.params.issueID }, (err, comment) => {
          if(err){
              res.status(500)
              return next(err)
          }
          return res.status(201).send(comment)
      })
  })

//Post
  commentRouter.post("/", (req, res, next) => {
    const newComment = new Comment(req.body)
    newComment.save((err, savedComment) => {
        if(err){
            res.status(500)
            return next (err)
        }
        return res.status(201).send(savedComment)
    })
})


//Delete
commentRouter.delete("/:commentId", (req, res, next) => {
    Comment.findOneAndDelete(
        {_id: req.params.commentId},
        (err, deletedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted: ${deletedComment.user} from the database.`)
        }
        )
    })

    //update
    commentRouter.put("/:commentId", (req, res, next) => {
        Comment.findOneAndUpdate(
            {_id: req.params.commentId},
            req.body,
            {new:true},
            (err, updatedComment) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                return res.status(201).send(updatedComment)
            }
        )
    })
    
    module.exports = commentRouter