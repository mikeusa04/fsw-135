const express = require("express");
const commentsRouter = express.Router();
const Comments = require("../models/comments.js");

//CREATE or POST ONE
commentsRouter.post("/", (req, res, next) => {
  req.body.user = req.user._id         // we added this one here       
  const newComments = new Comments(req.body);
  newComments.save((err, savedComments) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(savedComments);
  });
});

//READ ALL or FIND ALL or GET ALL
commentsRouter.get("/", (req, res, next) => {
  Comments.find((err, comments) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(comments);
  });
});

//READ or GET ALL COMMENTS BY userID, to do this
//GET localhost9000/user,SEND, copy the id for any user u like to get his comments,
//GET localhost9000/comments/paste the userid here then SEND, u will get the comments
//for that specific user u chose
commentsRouter.get('/:userID', (req, res, next) => {
  Comments.find({user: req.params.userID}, (err, comments) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(comments)
  })
})

//READ ONE or FIND ONE or GET ONE
commentsRouter.get("/:commentsId", (req, res, next) => {
  Comments.findOne({ _id: req.params.commentsId }, (err, comments) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(comments);
  });
});

//UPDATE or PUT 
commentsRouter.put("/:commentsId", (req, res, next) => {
  Comments.findOneAndUpdate(
    { _id: req.params.commentsId },
    req.body,
    { new: true },
    (err, updatedComments) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(201).send(updatedComments);
    }
  );
});

// DELETE ONE
commentsRouter.delete("/:commentsId", (req, res, next) => {
  Comments.findOneAndDelete(
    { _id: req.params.commentsId },
    (err, deletedComments) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res
        .status(200)
        .send(
          `Successfully deleted item ${deletedComments.subject} from the database`
        );
    }
  );
});

module.exports = commentsRouter;