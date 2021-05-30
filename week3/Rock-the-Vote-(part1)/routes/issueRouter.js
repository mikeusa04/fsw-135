const express = require("express");
const issueRouter = express.Router();
const Issue = require("../models/issue");

//CREATE or POST ONE
issueRouter.post("/", (req, res, next) => {
  const newIssue = new Issue(req.body);
  newIssue.save((err, savedIssue) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(savedIssue);
  });
});

//READ ALL or FIND ALL or GET ALL
issueRouter.get("/", (req, res, next) => {
  Issue.find((err, issue) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(issue);
  });
});

//READ ONE or FIND ONE or GET ONE
issueRouter.get("/:issueId", (req, res, next) => {
  Issue.findOne({ _id: req.params.issueId }, (err, issue) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(issue);
  });
});

//UPDATE or PUT
issueRouter.put("/:issueId", (req, res, next) => {
  Issue.findOneAndUpdate(
    { _id: req.params.issueId },
    req.body,
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

// DELETE ONE
issueRouter.delete("/:issueId", (req, res, next) => {
  Issue.findOneAndDelete({ _id: req.params.issueId }, (err, deletedIssue) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res
      .status(200)
      .send(`Successfully deleted item ${deletedIssue.subject} from the database`);
  });
});

module.exports = issueRouter;