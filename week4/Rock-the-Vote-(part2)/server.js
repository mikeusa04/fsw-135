/*in order to make this program work you have to install express.js, go to
client directory
1. npx create-react-app my-app

go to client folder and install axios 
1. npm i axios

go to package.json in client folder 
1.go all the way down
2.put proxy like this
 },
 "proxy": "http://localhost:9000"
}
because we are using a react-router in this ex. then we need to install it
1. npm i react-router-dom
-------------above installation for React
-------------Below for MongoDB
-------------Mix above and below for React and MongoDB
1. Rock-the-Vote folder, open its terminal
2. npm init -y then hit enter
3. in the new path type 
4. npm i express then hit enter or npm i --save express

now install nodemon.js
1. same assignment1 folder, open its terminal
2. npm install nodemon then hit enter

now everytime you want to run the program go to
1. open its terminal
2. nodemon then the file name like (nodemon server.js then enter)

{you don't need to install uuid here because mongoose will generate the id for us 
1. go to the folder where you want to install it
2. open its terminal
3. npm i uuid}

install boolean
1. npm i boolean

install morgan
1. npm i morgan

install mongoose
1. npm i mongoose

because we creating token here for security and verification we need to install token
1. npm i jsonwebtoken
to create a hidden file to encript the password install dotenv
1. npm i dotenv
to work with token once it's been generated install express-jwt
1. npm i express-jwt

to run this program go client directory, open its terminal, cd my-app,type npm start then enter, go assignment1 open its terminal,
type nodemon server.js then enter
*/
/*Part 2: Week 4 - Server Continuation and Frontend setup
Note: This week’s project requirements are related to the material of Week 4.
Backend:
Install and implement:
Remember to prevent the .env file being pushed to GitHub
Dotenv
Express JSON Web Tokens (JWTs)
Relationships
A one to many relationship will be relating the user to issues, and relating the comments to users and to issues. 
A many to many relationship will be part of the upvote/downvote process as issues can be upvoted/downvoted by many users
Frontend:
Create a React app
Build the following components:
Login & Signup - ex. Use an AuthForm
Profile
Issues
Connect your Frontend & Backend using a proxy
Create Context for the User - ex. Create a UserProvider function
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
app.use('/api/comments', require('./routes/commentsRouter.js'))

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


/*to run this code don't put api before the comments route, go to postman, POST localhost9000/user, add in the
Body,raw,json add {"username": "mike", "password": "hii"} SEND, go to GET localhost9000/user SEND, copy the id 
for mike or anyother userid you like, go to POST localhost9000/comments, in the Body raw,json add 
{
    "subject": "revote",
    "comments": "a lot of people were cheating when they vote",
    "user": "the userid paste here"
}
click SEND, go to GET localhost9000/comments SEND, you will get the 
{
    "subject": "revote",
    "comments": "a lot of people were cheating when they vote",
    "user": "the userid that u got from the users route"
}
so now u connected the user to the comments and this is how u make a relational data.
*/