/*in order to make this program work you have to install express.js, go to
client directory
1. npx create-react-app my-app

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

install uuid 
1. go to the folder where you want to install it
2. open its terminal
3. npm i uuid

install boolean
1. npm i boolean

install morgan
1. npm i morgan

install momgoose
1. npm i mongoose

go to client folder and install axios 
1. npm i axios

go to package.json in client folder 
1.go all the down
2.put proxy like this
 },
 "proxy": "http://localhost:9000"
} 

to run this program go client directory, open its terminal, cd my-app,type npm start then enter, go assignment1 open its terminal,
type nodemon server.js then enter
*/
/*
Build a new server and connect it to mongodb.
In a folder called models create a file called inventory.js and define a InventorySchema for items in your store. Export a InventoryModel at the bottom.
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