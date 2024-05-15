const express = require('express');
const app = express();
const session = require('express-session');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine and create the server
app.set('view engine', 'ejs');
const http = require('http').Server(app);

//express-session middleware
app.use(session({
    secret: 'abcdef',
    resave: false,
    saveUninitialized: true,
    isLoggedIn: false,
    user: null,
    cookie: {  }
}))

// Routes
const routes = require('./router')

// Serve static files
app.use(express.static('public'));
app.use(routes);

// Start the server
const server = http.listen(3000, () => {
    console.log("Server is running");
});

// Handle server errors
server.on('error', (error) => {
    console.error('Server error:', error);
});
