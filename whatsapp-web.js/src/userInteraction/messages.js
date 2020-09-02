
const { Command } =  require("../models/commands");
const logic = require("../businessLogic/logic");
const { Website } = require("../models/website");
const { Product } = require('../models/product');



//commands and the corresponding function to be executed 
//are input in the array
const commands = [
     new Command({
        //User command
        command: 'wg',

        //function to be executed
        callback : (input) => {  
            logic.onWG();
            //mesage to be sent to the user
            let message = [
                `stop it and get some help by using the following command *wg help*`,
                `Hope everything works well`
            ];

            return message;
        }
    }),
    new Command({
        //User command
        command: `wg product new <id>`,
        //function to be executed
        callback : logic.onCreateProduct
    }),
    new Command({
        //User command
        command: `wg product delete <id>`,

        //function to be executed
        callback : logic.onDeleteProduct
    }),
    new Command({
        //User command
        command: `wg product select <id>`,
        //function to be executed
        callback : logic.onSelectProduct
    }),
        
        
    //gives user information on how to create website
    new Command({
        //User command
        command: 'wg help', 
        //function to be executed
        callback : logic.help
    }),

    //helps user to create a website. The first step.
    new Command({
        //User command
        command: 'wg create <company_name>', 

        //function to be executed
        callback : logic.onCreateWebsite
    }),
    //Inputs user's first name for website
    new Command({
        //User command
        command: 'wg website select <company_name>',
        callback : logic.onSelectWebsite
    }),

    new Command({
        //User command
        
        command: 'wg website firstname <firstName>', 

        //function to be executed
        callback : logic.onSetFirstName
    }),


    //inputs user last name in website
    new Command({
        //User command
        
        command: 'wg website lastname <lastName>', 

        //function to be executed
        callback : logic.onSetLastName
    }),

    //inputs the logo of the company to website using url of logo
    new Command({
        //User command
        command: 'wg website logo', 
        
        //function to be executed
        callback : logic.onSetLogo,
        requireMedia : true
    }),


    //inputs the banner for the company to website using url of banner
    new Command({
        //User command
        
        command: 'wg website banner', 

        //function to be executed
        callback : logic.onSetBanner,

        requireMedia: true,
    }),

    //inputs the description of the company to be seen in the website
    new Command({
        //User command
        
        command: 'wg website desc <desc>', 

        //function to be executed
        callback : logic.onSetDesc
    }),

    //inputs the email of the company for contacting.
    new Command({
        //User command
        
        command: 'wg website email <email>', 

        //function to be executed
        callback : logic.onSetEmail
    }),

    new Command({
        //User command
        
        command: 'wg website info', 

        //function to be executed
        callback : logic.onGetInfo
    }),
    new Command({
        //User command
        
        command: 'wg website finished', 

        //function to be executed
        callback : logic.onWebsiteFinished
    }),
    //gives user information on how to create website

    new Command({
        //User command
        command: `wg product all`,

        //function to be executed
        callback : logic.onGetAllProducts
    }),
    new Command({
        //User command
        command: `wg product info`,

        //function to be executed
        callback : logic.onGetProductInfo
    }),
    new Command({
        //User command
        command: `wg product name <product-name>`,

        //function to be executed
        callback : logic.onSetProductName
    }),
    new Command({
        //User command
        command: `wg product cost <product-cost>`,

        //function to be executed
        callback : logic.onSetProductCost
    }),
    new Command({
        //User command
        command: 'wg product desc <product-desc>',

        //function to be executed
        callback : logic.onSetProductDesc
    }),
    new Command({
        //User command
        command: 'wg product image',

        //function to be executed
        callback : logic.onSetProductImage,

        requireMedia: true
    }),
];


module.exports= onMessage = async (message, client) => {

    let command = null;

    //if the message start with wg then proceed
    if(message.body.startsWith("wg"))
    {
        //loop through all the commands
        for (let c of commands){
            //check if the message sent is equal to the commands
            //if the message matches a command,
            //then save the command in the command variable
            if(c.equals(message.body))
            {
                command = c;
                break;
            }
        }
        
        //if the command is not null, implies, the message sent is a valid command
        if(command != null){
            let input = {};
            //check if the command requires input
            if(command.requireInput){
                input = await command.getInput(message);
            }
            //determine the user
            logic.setUser(message.id.remote);
            //determine the input
            logic.setInput(input);
            //call callback function in the command
            //await is used, so that if a command is an async function
            //the program will wait until it is finished
            //the callback returns a message to be sent to the user
            let messageToBeSent = await command.callback();

            // send the message to the user
            for (let msg of messageToBeSent)
            {
                client.sendMessage(message.from, msg, new Object());
            }
        }
    }

}; 




//export default onMessage;