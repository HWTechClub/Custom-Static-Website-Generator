
const { Command } =  require("../models/commands");
const logic = require("../businessLogic/logic");

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
        command: 'wg help', 

        //function to be executed
        callback : (input) => {  

            logic.onWG();
            //mesage to be sent to the user
            let help_signal = [
                `Here are the following commands that can help you create your website`,
                `if you want to create a website use *wg create <company name>* and write the name of your company`,
                `if you already have a website us *wg website <company name>* to get access to the website`,
                `when creating your website you will be asked to give details of your company. To add these details you will have to write *wg website <firstName>* *wg website <lastName>* etc`,
                `If you want to check all the products that have already been created for your websit type *wg product all*`,
                `If you want to create a new product type *wg product new*`,
                `If you want to select a particular product for manipulating its data, give your product id as such: *wg product <id>`,
                `To get all information of the product you selected, type *wg product info*`,
                `To change the product name, type *wg product name <product-name>*`,
                `To change the product cost, type *wg product cost <product-cost>* `,
                `To change the product description, type *wg product desc <product-desc>*`,
                `To change the image of the product, type *wg product image <product-image>*`,
                `When you are done making your website and want to see it ,type *wg website finished*`,
                `If you want to delete a product, type *wg delete product<id>* where id is the product id`,
                `If you want to delete your whole website, type *wg delete website <company name>`,
                `That is all! Hope you make a great website~`
            ];

            return help_signal;
        }
    }),

    new Command({
        //User command
        

        command: 'wg create', 

        //function to be executed
        callback : (input) =>
         {  
            name_of_company = input.substring(9),
            
            logic.onWG();
            //mesage to be sent to the user
            let create_company = [
                `welcome to building your own website!`,
                `We would like you add the following details:`,
                `First Name`, 
                `Last Name`,
                `Company name`, 
                `Logo URL`,
                `Banner URL`, 
                `Description`, 
                `Email`,
                `For adding information use *wg website <firstname>*`
            ];

            return create_company;
        }
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
            if(command.requireInput)
            {
                input = command.getInput();
            }

            let messageToBeSent = command.callback(input);
            for (let msg of messageToBeSent)
            {
                client.sendMessage(message.from, msg, new Object());
            }
        }
    }

};



//export default onMessage;