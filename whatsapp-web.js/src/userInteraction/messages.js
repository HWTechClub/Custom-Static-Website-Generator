
const { Command } =  require("../models/commands");
const logic = require("../businessLogic/logic");
const { Website } = require("../models/website");
const { Product } = require('../models/product');

var selected_product = null;// Will keep track of the selected product
var selected_website = null; // Selected website.

///////////
//add the commands here
///////////


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
        callback : () =>  logic.onCreateProduct()
    }),
    new Command({
        //User command
        command: `wg product delete <id>`,

        //function to be executed
        callback : () => logic.onDeleteProduct()
    }),
    new Command({
        //User command
        command: `wg product select <id>`,

        //function to be executed
        callback : () => logic.onSelectProduct()
    }),
    new Command({
        //User command
        command: `wg product all`,

        //function to be executed
        callback : () => logic.onGetAllProducts()
    }),
    new Command({
        //User command
        command: `wg product info`,

        //function to be executed
        callback : () => logic.onGetProductInfo()
    }),
    new Command({
        //User command
        command: `wg product name <product-name>`,

        //function to be executed
        callback : () => logic.onSetProductName()
    }),
    new Command({
        //User command
        command: `wg product cost <product-cost>`,

        //function to be executed
        callback : () => logic.onSetProductCost()
    }),
    new Command({
        //User command
        command: 'wg product desc <product-desc>',

        //function to be executed
        callback : () => logic.onSetProductDesc()
    }),
    new Command({
        //User command
        command: 'wg product image <product-image>',

        //function to be executed
        callback : () => logic.onSetProductImage()
    }),
];



module.exports= onMessage = (message, client) => {

    let command = null;

    //if the message start with wg then proceed
    if(message.body.startsWith("wg"))
    {
        for (let c of commands){
            if(c.equals(message.body))
            {
                command = c;
                break;
            }
        }
    
        if(command != null){
            let input = {};
            if(command.requireInput){
                input = command.getInput(message.body);
            }
            
            logic.setUser(message.id.remote);
            logic.setInput(input);

            let messageToBeSent = command.callback();

            for (let msg of messageToBeSent)
            {
                client.sendMessage(message.from, msg, new Object());
            }
        }
    }

}; 



//export default onMessage;