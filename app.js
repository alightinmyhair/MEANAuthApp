const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to Database
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+ config.database);
});

//On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

const app = express();

const users = require('./routes/users');

const port = 3000;

app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(express.json());

//stating that we want to use /users for all of our user routes
app.use('/users', users);

//Index route
app.get('/', (req, res) => {
    res.send('Invalid endpoint');
});

app.listen(port, () => {
    console.log('Server started on port', + port);
});