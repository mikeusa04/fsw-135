const express = require("express");
const userRouter = express.Router();
const User = require("../models/user.js");

//Get all
userRouter.get("/", (req, res, next) => {
  User.find((err, users) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(users);
  });
});

//Get one
userRouter.get('/:userID', (req, res, next) => {
  User.findOne({_id: req.params.userID}, (err, users) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(users)
  })
})

//Post
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

//Delete
userRouter.delete("/:userID", (req, res, next) => {
  User.findOneAndDelete({ _id: req.params.userID }, (err, deletedItem) => {
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
userRouter.put("/:userID", (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.params.userID },
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

module.exports = userRouter;