const dialogflowClient      = require('apiai')(process.env.DF_ACCESS_TOKEN);

module.exports = (msg) => {
    const dialogflowSession = dialogflowClient.textRequest(msg, {sessionId: process.env.SESSION_ID});
    const promise = [];
    let responseMsg = "boo";

    return (new Promise(function(resolve, reject) {
        dialogflowSession.on('response', (response) => {
            // get response from Dialogflow
            responseMsg = response.result.fulfillment.speech;
            console.log(responseMsg);
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