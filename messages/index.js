/*-----------------------------------------------------------------------------
This template demonstrates how to use an IntentDialog with a LuisRecognizer to add 
natural language support to a bot. 
For a complete walkthrough of creating this type of bot see the article at
http://docs.botframework.com/builder/node/guides/understanding-natural-language/
-----------------------------------------------------------------------------*/
/*

// Add your requirements
var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.PORT || 3000, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector
    ({ appId: 'bd0e7669-139f-4507-b209-69e59393f0d6', appPassword: 'H3qhOgxaOFjdfD8jpfF2uXQ' });
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Create bot dialogs
bot.dialog('/', function (session) {
    session.send("Hello World");
});

*/

"use strict";
var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");

var useEmulator = (process.env.NODE_ENV == 'development');

var connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
    /*
    appId: process.env['MicrosoftAppId'],
    appPassword: process.env['MicrosoftAppPassword'],
    */
    appId: 'bd0e7669-139f-4507-b209-69e59393f0d6',
    appPassword: 'H3qhOgxaOFjdfD8jpfF2uXQ',
    stateEndpoint: process.env['BotStateEndpoint'],
    openIdMetadata: process.env['BotOpenIdMetadata']

});

var bot = new builder.UniversalBot(connector);


bot.dialog('/', function (session) {
    session.send("Hello World");
});




// Make sure you add code to validate these fields
var luisAppId = '9d945191c4e446a5be0ad1921d588952';
var luisAPIKey = '50b17e35fe2f41d9a20e95c22c7b979d';
var luisAPIHostName =  process.env.LuisAPIHostName ||  'westus.api.cognitive.microsoft.com';

const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v1/application?id=' + luisAppId + '&subscription-key=' + luisAPIKey;


// Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
var intents = new builder.IntentDialog({ recognizers: [recognizer] });


bot.dialog('/', dialog);


    /*
    .matches('<yourIntent>')... See details at http://docs.botframework.com/builder/node/guides/understanding-natural-language/
   
*/
/*
intents.matches('new account', [

    function (session, args, next) {
        console.log(args);
        session.send('this is the new account intent');

    }


]);
 */
/*
// Create bot dialogs
bot.dialog('/', function (session) {
    session.send("Hello World");
});
 */ 
.onDefault((session) =>
    {
    session.send('Sorry,  did not understand \'%s\'.', session.message.text);
    });
  

    

if (useEmulator) {
    var restify = require('restify');
    var server = restify.createServer();
    server.listen(3978, function() {
        console.log('test bot endpont at http://localhost:3978/api/messages');
    });
    server.post('/api/messages', connector.listen());    
} else {
    module.exports = { default: connector.listen() }
}

