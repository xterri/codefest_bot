'use strict';

const express               = require('express');
const session               = require('express-session');
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

// set user's sessionId
app.use(session({
    secret: process.env.SESSION_SECRET, // 'thisisasecret'
    cookie: { }
}));

// set up welcome msg (example)
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
        let sessData = req.session;      

        // set user sessionId to random string once user loads the page 
        sessData.sessionId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

        console.log("set sessionId: ", sessData.sessionId)

        // on every page reload, welcome msg starts over
        sendEventRequest(welcomeEvent, sessData.sessionId)
            .then(function(reply) {
                res.render('index', {resp: reply.result.fulfillment.speech});
            }, function(error) {
                console.error("Boo error from DF: " + error)
            });
    })
    .post(function(req, res) {
        console.log("sessionId: ", req.session.sessionId);
        let msg = req.body.text;
        console.log('Message from user: ' + msg + "\n");
        dialogflow(msg, req.session.sessionId).then(
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