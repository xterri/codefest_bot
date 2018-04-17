const dialogflowClient      = require('apiai')(process.env.DF_ACCESS_TOKEN);

function showMe(thing) {
    console.log("where will you show up? ", thing);
}

module.exports = (msg) => {
    const dialogflowSession = dialogflowClient.textRequest(msg, {sessionId: process.env.SESSION_ID});
    const promise = [];
    let responseMsg = "boo";

    dialogflowSession.on('response', (response) => {
        // get response from Dialogflow
        console.log("This should appear first");
        responseMsg = response.result.fulfillment.speech;
        console.log(responseMsg);
        showMe(responseMsg);
        return responseMsg;
    });

    dialogflowSession.on('error', error => console.error("Error retrieving DF's response body: ", error));
    dialogflowSession.end();

    console.log("This should appear second with msg: ", responseMsg);
    return responseMsg;
};