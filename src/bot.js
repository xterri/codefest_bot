const dialogflowClient      = require('apiai')(process.env.DF_ACCESS_TOKEN);
const handleActions         = require('./handleActions');

module.exports = (msg, sessionId) => {
    const dialogflowSession = dialogflowClient.textRequest(msg, {sessionId: sessionId});
    let responseMsg = "";

    return (new Promise(function(resolve, reject) {
        dialogflowSession.on('response', (response) => {
            // get response from Dialogflow
            responseMsg = response.result.fulfillment.speech;

            // add custom comments/html with response
            responseMsg += handleActions(response.result.action, response.lang);

            // console.log(responseMsg + '\n');
            resolve(responseMsg);
        });

        dialogflowSession.on('error', error => {
            console.error("Error retrieving DF's response body: ", error);
            reject(responseMsg);
        });
        
        dialogflowSession.end();
    }));

    // console.log("This should appear second with msg: ", responseMsg);
};