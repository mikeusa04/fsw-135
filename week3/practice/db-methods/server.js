/*in order to make this program work you have to install express.js, go to
client directory
1. npx create-react-app my-app

go to client folder and install axios 
1. npm i axios

go to package.json in client folder 
1.go all the down
2.put proxy like this
 },
 "proxy": "http://localhost:9000"
}
-------------above installation for React
-------------Below for MongoDB
-------------Mix above and below for React and MongoDB
1. eCommerce folder, open its terminal
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

to run this program go client directory, open its terminal, cd my-app,type npm start then enter, go assignment1 open its terminal,
type nodemon server.js then enter
*/






const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

// Middleware (for every request) //
app.use(express.json()) 
app.use(morgan('dev')) 

// Connect to DB
mongoose.connect('mongodb://localhost:27017/db-methods',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log('Connected to the DB')
)

// Routes //
app.use('/books', require('./routes/bookRouter.js'))
app.use('/authors', require('./routes/authorRouter.js'))

// Error handler
app.use((err, req, res, next) => {
  console.log(err)
  return res.send({errMsg: err.message})
})

// Server Listen //
app.listen(9000, () => {
  console.log('The server is running on Port 9000')
})