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
/*Part 3: Week 5 - Front-end authentication, and adding security features
Note: This week’s project requirements are related to the material of Week 5.

Saving the User and Token
Add logging out functionality - reset state & localStorage
Create Axios HTTP Requests
Use Axios interceptor to add User token to request headers
Encrypt passwords using bcrypt
Use schema methods to check & remove password
*/





const express = require('express');
const server = express();
require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');
const expressJwt = require('express-jwt');

server.use(morgan('dev'))
server.use(express.json())

mongoose.connect('mongodb://localhost:27017/rockthevote',
 {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, 
() => console.log("Connected to the VOTE"));

server.use('/auth', require('./router/authRouter.js'))
server.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['HS256']}))
server.use('/api/user', require('./router/authRouter.js'))
server.use('/api/issue', require('./router/issueRouter.js'))
server.use('/api/comment', require('./router/commentRouter.js'))

server.use((err, req, res, next)=>{
    console.log(err)
    if(err.name === "Unauthorized Error"){
        res.status(err.status);
    }
    return res.send({errMsg: err.message})
})

server.listen(9000, ()=> {console.log('Server is running on Port 9000')})