const express = require('express')
const bookRouter = express.Router()
const Book = require('../models/book.js')

// Get All
bookRouter.get('/', (req, res, next) => {
  Book.find((err, books) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(books)
  })
})

// Get by author ID to get all books by the same author 
//go to postman GET localhost9000/authors SEND, copy any authorid, GET localhost9000/books/authorid here SEND
bookRouter.get('/:authorID', (req, res, next) => {
    Book.find({author: req.params.authorID}, (err, books) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(books)
    })
  })

// Add new book
bookRouter.post('/', (req, res, next) => {
  const newBook = new Book(req.body)
  newBook.save((err, savedBook) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedBook)
  })
})

// to create a relatioship between book and author
// go to postman, GET localhost9000/authors , copy any authorid, POST localhost9000/books and Body,raw,json
// and type {"title": "Harry potter...", "author": "paste the authorid here"} then SEND you will get a title with
//authorid and new id for the new post also. congratulation u made a relational database.


// To add as many books for the same author go get the authorid from GET localhost9000/authors, copy the
//authorid {"title": "any book here", "author": "paste the authorid here"} then SEND. add as much as u want.

//like a book
//go to postman, GET localhost9000/books SEND, copy any book id, PUT localhost9000/books/like/bookid, SEND, u 
// will see the like is 1, click SEND gain u will see the like is 2.....etc
bookRouter.put('/like/:bookID', (req, res, next) => {
  Book.findOneAndUpdate(
    { _id: req.params.bookID },
    { $inc: { likes: 1 }},
    { new: true },
    (err, updatedBook) => {
      if(err) {
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedBook)
    }
  )
})

// Find Books by Range, go to postman
//GET localhost9000/books/search/bylikes/5/10 SEND, u will get books whoe were liked from 5 likes to 10 likes
bookRouter.get('/search/bylikes/:btm/:top', (req, res, next) => {
  Book.where('likes').gte(req.params.btm).lte(req.params.top).exec((err, book)=> {
    if(err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(book)
  })
})

module.exports = bookRouter