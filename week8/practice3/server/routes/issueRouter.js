const express = require("express");
const issueRouter = express.Router();
const Issue = require("../models/issue.js");

// Get all
issueRouter.get("/", (req, res, next) => {
  Issue.find((err, issues) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(issues);
  });
});

//Get one
issueRouter.get("/user", (req, res, next) => {
  Issue.find({ user: req.user._id }, (err, issues) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(issues);
  });
});

//Get one
issueRouter.get("/:issueID", (req, res, next) => {
  Issue.findOne({ _id: req.params.issueID }, (err, issue) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(issue);
  });
});

//Post
issueRouter.post("/", (req, res, next) => {
  const newIssue = new Issue(req.body);
  newIssue.user = req.user;
  console.log(req.user, newIssue.user);
  newIssue.save((err, savedIssue) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(savedIssue);
  });
});

//Delete
issueRouter.delete("/:issueID", (req, res, next) => {
  Issue.findOneAndDelete({ _id: req.params.issueID }, (err, deletedItem) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res
      .status(200)
      .send(`Successfully deleted item ${deletedItem._id} from the database`);
  });
});

//update
issueRouter.put("/upVote/:issueID", (req, res, next) => {
  Issue.findOneAndUpdate(
    { _id: req.params.issueID },
    {$inc: {upVotes: 1}},
    { new: true },
    (err, updatedIssue) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(201).send(updatedIssue);
    }
  );
});
issueRouter.put("/downVote/:issueID", (req, res, next) => {
  Issue.findOneAndUpdate(
    { _id: req.params.issueID },
    {$inc: {downVotes: 1}},
    { new: true },
    (err, updatedIssue) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(201).send(updatedIssue);
    }
  );
});

module.exports = issueRouter;