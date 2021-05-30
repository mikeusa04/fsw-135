const express = require('express')
const authorRouter = express.Router()
const Author = require('../models/author.js')

// Get All
authorRouter.get('/', (req, res, next) => {
  Author.find((err, authors) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(authors)
  })
})

// Get Author by Search Term, go to postman
// GET localhost9000/authors/search?author=john SEND, we will get 2 different johns, if we put just j instead
// of john we will get all authors start with j, same with only if we add ma
authorRouter.get('/search', (req, res, next) => {
  const { author } = req.query
  const pattern = new RegExp(author)
  Author.find (
    { name: { $regex: pattern, $options: 'i' } }, 
    (err, authors) => {
      if(err) {
          res.status(500)
          return next(err)
      }
      return res.status(201).send(authors)
    }
  )
})

// Add new author, go to postman
//POST localhost9000/authors SEND but u have to choose body, raw, jason then type in body {"name": "mike saleh"}
authorRouter.post('/', (req, res, next) => {
  const newAuthor = new Author(req.body)
  newAuthor.save((err, savedAuthor) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedAuthor)
  })
})

// Add many authors
//go to post man, copy all what u have in author.json, paste them in postman, 
//POST localhost/9000/authors/manyauthors SEND
authorRouter.post('/manyauthors', (req, res, next) => {
  const Authors = req.body
  const newAuthor = new Author(Authors)
  Author.insertMany(Authors, (err, savedAuthor) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedAuthor)
  })
})



module.exports = authorRouter