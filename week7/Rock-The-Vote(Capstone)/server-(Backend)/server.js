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
because we are hashing the password we need to install bcrypt
1. npm i bcrypt

to run this program go  to client directory, open its terminal, cd my-app,type npm start then enter, go assignment1 open its terminal,
type nodemon server.js then enter
*/




const express = require("express")
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')
require('dotenv').config()

// Middleware (for every request) //
app.use(express.json())
app.use(morgan('dev'))

//connection to DB
mongoose.connect('mongodb://localhost:27017/voter-list-db',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log("Connected to the voter-DB")
)

// extra step, test to see if mongo is connected
mongoose.connection.on('connected', () => {
  console.log('mongo is connected')
})

//authrouter
app.use('/auth', require('./routes/authRouter.js'))

//api ENV file
app.use('/api', expressJwt({secret: process.env.SECRET,algorithms: ["RS256", "HS256"]}))

//Routes for my Schemas
app.use("/api/user", require("./routes/userRouter"))
app.use("/api/issue", require("./routes/issueRouter"))
app.use("/api/comment", require("./routes/commentRouter"))


//error handler 
app.use((err, req, res, next) => {
  console.log(err)
  if (err.name === "unauthorized Error") {
    res.status(err.status)
  }
  return res.send({ errMsg: err.message })
})

//server listener
app.listen(9000, () => {
  console.log("The server is running on LocalHost:9000")
})