const express = require('express');
const authRouter = express.Router();
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

// Signup
authRouter.post("/signup", (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(user){
            res.status(403)
            return next(new Error('Username Already Exists'))
        }
        const newUser = new User(req.body)
        newUser.save((err, savedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
            return res.status(201).send({ token, user: savedUser.withoutPassword() })
        })
    })
})

// Login
authRouter.post("/login", (req, res, next) => {
    const failedLogin = 'Invalid Credentials'
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(!user){
            res.status(403)
            return next(new Error(failedLogin))
        }
        user.checkPassword(req.body.password, (err, isMatch) => {
            if(err) {
                res.status(403)
                return next(new Error(failedLogin))
            }
            if(!isMatch) {
                res.status(403)
                return next(new Error(failedLogin))
            }
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.status(200).send({ token, user: user.withoutPassword() })
        })
    })
})



//CREATE (POST)
authRouter.post('/', (req, res, next) => {
    const newUser = new User(req.body)
    newUser.save((err, savedUser) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedUser)
    })
})

//READ ALL (GET)
authRouter.get('/', (req, res, next) => {
    User.find((err, user) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(user)
    })
})

//READ ONE
authRouter.get('/:userId', (req, res, next) => {
    User.findById(req.params.userId, (err, result) => {
        if (err) {
            res.status(500)
            return next(err)
        } else {
            return res.status(200).send(result)
        }
    })
})


//UPDATE (PUT)
authRouter.put('/:userId', (req, res, next) => {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true },
        (err, updatedUser) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedUser)
        }
    )
}) 

//DELETE
authRouter.delete('/:userId', (req, res, next) => {
    User.findOneAndDelete({ _id: req.params.userId }, (err, deletedItem) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Item ${deletedItem} removed from database`)
        //deletedItem returns null in postman 
    })

})

module.exports = authRouter