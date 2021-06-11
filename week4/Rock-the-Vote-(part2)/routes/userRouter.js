const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");

//CREATE or POST ONE
userRouter.post("/", (req, res, next) => {
  const newUser = new User(req.body);
  newUser.save((err, savedUser) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(savedUser);
  });
});

//READ ALL or FIND ALL or GET ALL
userRouter.get("/", (req, res, next) => {
  User.find((err, user) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(user);
  });
});

//READD ONE or FIND ONE or GET ONE
userRouter.get("/:userId", (req, res, next) => {
  User.find({ _id: req.params.userId }, (err, user) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(user);
  });
});

//UPDATE or PUT
userRouter.put("/:userId", (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    req.body,
    { new: true },
    (err, updatedUser) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(201).send(updatedUser);
    }
  );
});

// DELETE ONE
userRouter.delete("/:userId", (req, res, next) => {
  User.findOneAndDelete({ _id: req.params.userId }, (err, deletedUser) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res
      .status(200)
      .send(`Successfully deleted item ${deletedUser.username} from the database`);
  });
});

module.exports = userRouter;