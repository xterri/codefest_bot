'use strict';

const express               = require('express');
const bodyParser            = require('body-parser');
const dialogflow            = require('./src/bot');
const sendEventRequest      = require('./src/eventRequest');

const PORT = 5000;

// set up server side with express 
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// using templating language, EJS
app.set('view engine', 'ejs');

// required to serve static files from multiple directories
app.use(express.static('public'));

// set up welcome msg
const welcomeEvent = {
    name: "welcome",
    data: {},
    // followupEvent: {
    //     name: "participation",
    //     data: { yes: "Great!", no: "Maybe next time"}
    // },
};

app.route('/')
    .get(function(req, res) {
        // on every page reload, welcome msg starts over
        sendEventRequest(welcomeEvent, process.env.SESSION_ID)
            .then(function(reply) {
                res.render('index', {resp: reply.result.fulfillment.speech});
            }, function(error) {
                console.error("Boo error from DF: " + error)
            });
    })
    .post(function(req, res) {
        console.log(req.body);
        let msg = req.body.text;
        console.log('Message from user: ' + msg + "\n");
        dialogflow(msg).then(
            function(resMsg) {
                console.log('Got response from DF: ' + resMsg + "\n");
                res.send(resMsg);
            },
            function(err) {
                console.error('Got error from DF: ' + err);
            })
    });

let port = process.env.PORT || PORT; // production uses different port
console.log("Server listening on port " + port);
app.listen(port);