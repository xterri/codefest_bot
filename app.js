'use strict';

const express       = require('express');
const bodyParser    = require('body-parser');

const PORT = 5000;

// set up server side with express 
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// using templating language, EJS
app.set('view engine', 'ejs');

// required to serve static files from multiple directories
app.use(express.static('public'));

app.route('/')
    .get(function(req, res) {
        
        res.render('index'); 
    })
    .post(function(req, res) {
        res.redirect("/");
});

let port = process.env.PORT || PORT; // production uses different port
console.log("Server listening on port " + port);
app.listen(port);