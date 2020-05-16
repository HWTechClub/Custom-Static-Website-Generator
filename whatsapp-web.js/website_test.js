const fs = require('fs');
var request = require('request');
const { Client, Location } = require('./index');
const MessageMedia = require('./src/structures/MessageMedia');

// Data structure to store basic information : To ensure that user gets the website genreated wit the data which he wrote
/*
data = [
{
id = 971527547820
csv = "",
basic_data = []
}
]
*/

// Test varaibles to BETA stage
var data = []
/*let product_id = "";
let product_name = "";
let description = "";
let cost = 0;
let product_image = "";
*/
var a = "";
var array;
//Sample Test data given
var j = "firstName: 'vfsdf',lastName: 'sdfsdf',companyName: 'sdfsdf',logoUrl: 'sdfsdf',bannerUrl: 'sdfsdfsdf',email: 'sdfsdf@fssdfsfd.com',description: 'sdfsdfsdf',template: 'Colo_Shop'";
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
client.on('auth_failure', msg =>
{
    console.error('AUTHENTICATION FAILURE', msg);
});
client.on('ready', () =>
{
    console.log('READY');
});

// varaible naming to be changed
a = "product id,product name,description,cost,product image url";


client.on('message', async msg =>
{
    console.log('MESSAGE RECEIVED', msg);
    if (msg.body == 'new row')
    {
        msg.reply("Enter the following commands:");
        client.sendMessage(msg.from, 'product id: *INFORMATION GOES HERE*');
        client.sendMessage(msg.from, 'product name: *INFORMATION GOES HERE*')
        client.sendMessage(msg.from, 'description: *INFORMATION GOES HERE*')
        client.sendMessage(msg.from, 'cost: *INFORMATION GOES HERE*')
        client.sendMessage(msg.from, 'product image: *ATTACH IMAGE HERE*')
        client.sendMessage(msg.from, '!done when all information is entered')
        fs.writeFileSync('./test.csv', a);
        product_id = "";
        product_name = "";
        description = "";
        cost = 0;
        product_image = "";
    }
    else if (msg.body.startsWith('product id:'))
    {
        id = check_id(msg.id.remote);
        data[id].data.push({product_id:msg.body.slice(11)});
        //data[id].data[data.cur_iter_data].product_id= msg.body.slice(11);
    }
    else if (msg.body.startsWith('product name:'))
    {
        id = check_id(msg.id.remote);
        data[id].data[data[id].cur_iter_data].product_name = msg.body.slice(13);
    }
    else if (msg.body.startsWith("description:"))
    {
        id = check_id(msg.id.remote);
        data[id].data[data[id].cur_iter_data].description = msg.body.slice(12);
    }
    else if (msg.body.startsWith('cost:'))
    {
        id = check_id(msg.id.remote);
        data[id].data[data[id].cur_iter_data].cost = Number(msg.body.slice(12));
    }
    // Testing Phase

    // Phase in fixing the bug
    /* else if (msg.body == 'product image:' && msg.hasMedia)
    {
        product_image = await msg.downloadMedia();
        // const attachmentData = new MessageMedia('image/png',fs.readFileSync(memePath,'base64'),'meme.png');
        console.log(product_image);
    } */
    else if(msg.body.startsWith('product image:')){
     // const attachmentData = Number(msg.body.slice(13));
      id = check_id(msg.id.remote);
      data[id].data[data[id].cur_iter_data].product_image = msg.body.slice(14);
    }
    else if(msg.body == "!done")
    {
        var s = "";
        var comma = "," ;
        id = check_id(msg.id.remote);

// Using currently image Url until issue fixed
     /*   s = "\n".concat(product_id,comma,product_name,comma,description,comma,cost,comma,"data:image/jpeg;base64 ",product_image["data"]); */
        //s = "\n".concat(product_id,comma,product_name,comma,description,comma,cost,comma,product_image);

        row = data[id].data[data[id].cur_iter_data];
        //console.log(a)
        data[id].csv = data[id].csv.concat("\n".concat(row.product_id,comma,row.product_name,comma,row.description,comma,row.cost,comma,row.product_image));
        console.log(data[id].csv);

        data[id].cur_iter_data++;

        // fs.writeFileSync('./test.csv', a);
    }

    else if(msg.body == "!info")
    {
        client.sendMessage(msg.from,`*We are still working userflow interactions and use this is the BETA release*. Currently we only accept image url's.`);
        client.sendMessage(msg.from,"For entering details enter details using the following syntax :");
        client.sendMessage(msg.from,"1. *Command* !details firstName,lastName,companyName,logoUrl,bannerUrl,email,description");
        client.sendMessage(msg.from,"2. *Command* new row");
        client.sendMessage(msg.from,"Please do wait for the commands to appear");
        client.sendMessage(msg.from,"3. *Command* !done : Must be added after each row is added");
        client.sendMessage(msg.from,"4. *Command* !finished : To ensure the deploy the website");
        client.sendMessage(msg.from,"The current version we are using you can only use a single template and only generate new websites");
    }
    else if(msg.body.startsWith("!details"))
    {

        var message = msg.body.slice(6);
        array = message.split(",");

        id = check_id(msg.id.remote);
        data[id].intial_data = array;

    }
    else if(msg.body == "!finished")
    {
        id = check_id(msg.id.remote);

        j = {firstName: "",
        lastName: "",
        companyName: "",
        logoUrl: "",
        bannerUrl: "",
        email: "",
        description: "",
        template: "Colo_Shop",
        csv: "" };

        j["firstName"] = data[id].intial_data[0];
        j["lastName"] = data[id].intial_data[1];
        j["companyName"] = data[id].intial_data[2];
        j["logoUrl"] = data[id].intial_data[3];
        j["bannerUrl"] = data[id].intial_data[4];
        j["email"] = data[id].intial_data[5];
        j["description"] = data[id].intial_data[6];
        j["csv"] = data[id].csv ;
        j = JSON.stringify(j);
        console.log(j)
        request({
            url: process.argv[2]+"/generate",
            method: "POST",
            headers: {
                "content-type": "application/json",  // <--Very important!!!
            },
            body: j
        }, function (error, response, body){
            // Gets Url from the Argument
            client.sendMessage(msg.from, process.argv[2] + "/pages/" + JSON.parse(response.body).directory);
             client.sendMessage(msg.from,"*Website ID:*" + JSON.parse(response.body).directory);
             client.sendMessage(msg.from,"*Important to remember the ID*");
             a = "product id,product name,description,cost,product image url";
        });
        // var website_link = "https://localhost:8004" + "/pages/" + data.directory
    }

});

client.on('disconnected', (reason) =>
{
    console.log('Client was logged out', reason);
});


// Helper functions

// Checks id if does not exsist adds to the list
function check_id(id){
   var found = 0;
   // Checks if the ID exsists
   for(var i = 0;i < data.length; i++){
     if(data[i].id == id){
        found = 1;
        return i;
     }
   }

   if(found == 0){
     data.push({id:id,data:[],cur_iter_data:0,csv:"product id,product name,description,cost,product image url"});
     return (data.length - 1);
   }

}
