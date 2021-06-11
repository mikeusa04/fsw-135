/* to set up the authentication you need first  to install these libraries
npm install jsonwebtoken
npm install dotenv
npm install express-jwt
then you have to add the authentication code to the server.js, the code is:

require(‘dotenv’).config()
const expressJwt = require(‘express-jwt’)

app.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['RS256'] }))
app.use('/api/todo ...

if(err.name === “Unauthorized Error”){
   res.status(err.status)
}

we already added this to the week3 server.js but we will added here again just for an ex.
*/


const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const expressJwt = require("express-jwt");  // require by express-jwt
require("dotenv").config();                 // require by dotenv

// Middleware 
app.use(express.json());
app.use(morgan("dev")); 

// create connection to the Database
mongoose.connect(
  "mongodb://localhost:27017/voter-list-db",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => console.log("Connected to the voter-DB")// u will see this message in nodemon once u get connectd
);

// //Routes
app.use('/auth', require('./routes/authRouter.js'))
app.use('/api', expressJwt({secret: process.env.SECRET, algorithms: ["HS256"]}))
app.use('/user', require('./routes/userRouter.js'))
app.use('/api/issue', require('./routes/issueRouter.js'))  // we have to add api because anything we want to be validated for authentication has to go through the api to have the token  
app.use('/comments', require('./routes/commentsRouter.js'))

//Error handling
app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === "UnauthorizedError") {
    res.status(err.status);
  }
  return res.send({errMsg: err.message});
});

//server is listening
app.listen(9000, () => {
  console.log("App is listening on port 9000!");
});
