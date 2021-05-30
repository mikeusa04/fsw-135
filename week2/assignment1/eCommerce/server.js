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
/*Create a new folder called routes containing a file inventory.js.
Create all the necessary routes to make a fully CRUD application (GET, GET(one), POST, PUT, DELETE, ).
Populate your inventory using Postman. Be sure to test each endpoint.
*/



// Express Server
const express = require('express');
const app = express();
const morgan = require('morgan');

// Server Middleware
app.use(express.json());
app.use(morgan('dev'));

// Mongoose connect to DB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/inventorydb',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log("Connected to the DB")
);

// Inventory Route
app.use('/inventory', require('./routes/inventoryRouter'));

//extra step, the original route, put on search bar localhost9000/  hit enter you will see Hellooo, Mike on the web page
app.get('/',(req, res) => {
    res.send("Hellooo, Mike");
});

// App Set To Listen
app.listen(9000, () => console.log('Server Is Listening On Port 9000'));