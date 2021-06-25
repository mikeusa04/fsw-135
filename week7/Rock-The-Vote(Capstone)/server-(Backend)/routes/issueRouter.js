const express = require('express')
const issueRouter = express.Router()
const Issue = require("../models/issue.js")

//Get all
issueRouter.get('/', (req, res, next) => {
    Issue.find((err, issues) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(issues)
    })
  })

//Get one
  issueRouter.get('/:issueId', (req, res, next) => {
      Issue.findById(req.params.issueId, (err, issue) => {
          if(err){
              res.status(500)
              return next(err)
          }
          return res.status(201).send(issue)
    })
  })

//Get one
  issueRouter.get('/user', (req, res, next) => {
      Issue.find({ user: req.user._id }, (err, issues) => {
          if(err){
              res.status(500)
              return next(err)
          }
          return res.status(201).send(issues)
    })
  })  


/* Post
issueRouter.post("/", (req, res, next) => {
    req.body.userID = req.user._id
    const newIssue = new Issue(req.body)
    newIssue.save((err, savedIssue) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedIssue)
    })
})*/

//Post
issueRouter.post("/", (req, res, next) => {
    const newIssue = new Issue(req.body)
    newIssue.user = req.user;
    console.log(req.user, newIssue.user)
    newIssue.save((err, savedIssue) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedIssue)
    })
})


//Delete
issueRouter.delete("/:issueId", (req, res, next) => {
    Issue.findOneAndDelete({ _id: req.params.issueId }, (err, deletedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted: ${deletedIssue._id} from the database.`)
        }
        )
    })

    //update
    issueRouter.put("/:issueId", (req, res, next) => {
        Issue.findOneAndUpdate(
            { _id: req.params.issueId},
            req.body,
            {new:true},
            (err, updateIssue) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                return res.status(201).send(updateIssue)
            }
        )
    })
    
    module.exports = issueRouter