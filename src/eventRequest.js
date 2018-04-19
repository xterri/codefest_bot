const dialogflowClient      = require('apiai')(process.env.DF_ACCESS_TOKEN);

module.exports = (event, sessionId) => {
    return new Promise(function(resolve, reject) {
        var dialogflowSession = dialogflowClient.eventRequest(event, {sessionId: sessionId});

        dialogflowSession.on('response', function(response) {
            return resolve(response);
        });

        dialogflowSession.on('error', function(error) {
            return reject(error);
        });
        
        dialogflowSession.end();
    });
};