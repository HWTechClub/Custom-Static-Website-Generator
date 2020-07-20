const fs = require('fs');
var request = require('request');
const { Client } = require('whatsapp-web.js');
const onMessage = require('./src/userInteraction/messages');



const SESSION_FILE_PATH = './session.json';
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH))
{
    sessionCfg = require(SESSION_FILE_PATH);
}

const client = new Client({ puppeteer: { headless: false }, session: sessionCfg });
client.initialize();


client.on('qr', (qr) =>
{
    console.log('QR RECEIVED', qr);
});

client.on('authenticated', (session) =>
{
    console.log('AUTHENTICATED', session);
    sessionCfg=session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err)
        {
            console.error(err);
        }
    });
});
client.on('auth_failure', (msg) =>
{
    console.error('AUTHENTICATION FAILURE', msg);
});
client.on('ready', () =>
{
    console.log('READY');
});

client.on('message', async (msg)  => {

    onMessage(msg, client);
    
});

client.on('disconnected', (reason) =>
{
    console.log('Client was logged out', reason);
});
