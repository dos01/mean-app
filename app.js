const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config=require('./config/database');

//connect to the database
mongoose.connect(config.database);

//check db connection on
mongoose.connection.on('connected',()=>{
    console.log('Connected to database '+config.database);
})

//check db connection on
mongoose.connection.on('error',(err)=>{
    console.log('db error '+err);
})

const app = express();

const users=require('./routes/users');
//port number
const port=3000;

//include projects
const projects = require('./routes/projects');

// CORS Middleware
app.use(cors());

// Set Static Folder client server files for an2 like index.html
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware in oder to authernticate process
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//add route for users
app.use('/users',users);

//add route for projects
app.use('/projects', projects);

//Index route
app.get('/',(req,res)=>{
    res.send('Invalid Endpoint');
});

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname));
})

//start server
app.listen(port,()=>{
    console.log('Server started on port '+port);
})