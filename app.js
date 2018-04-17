'use strict';

const express               = require('express');
const bodyParser            = require('body-parser');
const dialogflow            = require('./src/bot');

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
        res.render('index', {resp: ""}); 
    })
    .post(function(req, res) {
        let msg = req.body.text;

        let responseMsg = "check";//dialogflow(msg);

        res.render('index', {resp: responseMsg});
    });

let port = process.env.PORT || PORT; // production uses different port
console.log("Server listening on port " + port);
app.listen(port);