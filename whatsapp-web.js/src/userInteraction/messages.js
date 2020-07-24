
const { Command } =  require("../models/commands");
const logic = require("../businessLogic/logic");
const { Website } = require("../models/website");
const { Product } = require('../models/product');

var selected_product = null;// Will keep track of the selected product
var selected_website = new Website; // Selected website.

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
        callback : (input) => {  

            logic.onWG();
            if(selected_website==null)
            {
                let message = [
                    `A website should be selected or created before creating a product `
                 ];
                return message;
            }
            selected_product= logic.addProduct(input,selected_website);
            //mesage to be sent to the user
            let message = [
                `The product has been created with the id : ` + selected_product.id ,
                `This product has been selected . \nNow you can make change to the product with the following commands : \n1. wg product info \n2. wg product name <product-name> \n3. wg product cost <product-cost> \n4. wg product desc <product-desc> \n5. wg product image <product-image>`
            ];
            
            return message;
        }
    }),
    new Command({
        //User command
        command: `wg delete product <id>`,

        //function to be executed
        callback : (input) => {  

            logic.onWG();
            if(selected_website==null)
            {
                let message = [
                    `A website should be selected or created before deleting  a product `
                 ];
                return message;
            }

            if(logic.deleteProduct(input,selected_website) == false)
            {
                let message = [
                    `No product with the given id`
                ];
                return message;
            }

            let message = [
                `The product has been deleted with the id : ` + id 
            ];
            return message;
        }
    }),
    new Command({
        //User command
        command: `wg product <id>`,

        //function to be executed
        callback : (input) => {  

            logic.onWG();
            if(selected_website==null)
            {
                let message = [
                    `A website should be selected or created before selecting a product `
                 ];
                return message;
            }
            // Find the product with the given id
            selected_product = selected_website.products.getData(input);
            if(selected_product == null)
            {
                logic.addProduct(id,selected_website);
                let message = [
                    `There was no product with the give id. So a new product was created and selected with the id : ` + selected_product.id ,
                    `Now you can make change to the product with the following commands : \n1. wg product info \n2. wg product name <product-name> \n3. wg product cost <product-cost> \n4. wg product desc <product-desc> \n5. wg product image <product-image>`
                ];
                
                return message;
            }

            let message = [
                `The product has been selected with the id : ` + id ,
                'Now you can make change to the product with the following commands : \n1. wg product info \n2. wg product name <product-name> \n3. wg product cost <product-cost> \n4. wg product desc <product-desc> \n5. wg product image <product-image>'

            ];

            return message;
        }
    }),
    new Command({
        //User command
        command: `wg product all`,

        //function to be executed
        callback : () => {  

            logic.onWG();
            if(selected_website==null)
            {
                let message = [
                    `A website should be selected or created `
                 ];
                return message;
            }
            let message = [
                'Your website has following products'
            ];
            for(let p of selected_website.products.getAllData().values())
            {
                let m = 'Product id: ' + p.id + '\nProduct Name : ' + p.name + '\nProduct description : '+ p.desc + '\nProduct Cost: ' + p.cost + '\nProduct Image : '+ p.image
                message.push(m);
            }

            return message;
        }
    }),
    new Command({
        //User command
        command: `wg product info`,

        //function to be executed
        callback : () => {  

            logic.onWG();
            if(selected_product == null)
            {
                let message = [
                    `A product should be selected `
                 ];
                return message;
            }
            let message = [
                'Product id: ' + p.id,
                'Product Name : ' + p.name ,
                'Product description : '+ p.desc ,
                'Product Cost: ' + p.cost ,
                'Product Image : '+ p.image
               ];

            return message;
        }
    }),
    new Command({
        //User command
        command: `wg product name <product-name>`,

        //function to be executed
        callback : (input) => {  

            logic.onWG();
            if(selected_product == null)
            {
                let message = [
                    `A product should be selected `
                 ];
                return message;
            }
            selected_product.name= input;
            let message = [
                'The product name has been set to  '+ given_name
               ];

            return message;
        }
    }),
    new Command({
        //User command
        command: `wg product cost <product-cost>`,

        //function to be executed
        callback : (input) => {  

            logic.onWG();
            if(selected_product == null)
            {
                let message = [
                    `A product should be selected `
                 ];
                return message;
            }
            selected_product.cost= input;
            let message = [
                'The product cost has been set to  '+ given_cost
               ];

            return message;
        }
    }),
    new Command({
        //User command
        command: 'wg product desc <product-desc>',

        //function to be executed
        callback : (input) => {  

            logic.onWG();
            if(selected_product == null)
            {
                let message = [
                    `A product should be selected `
                 ];
                return message;
            }
            selected_product.desc = input;
            let message = [
                'The product description has been set to : '+ given_desc
               ];

            return message;
        }
    }),
    new Command({
        //User command
        command: 'wg product image <product-image>',

        //function to be executed
        callback : (input) => {  

            logic.onWG();
            if(selected_product == null)
            {
                let message = [
                    `A product should be selected `
                 ];
                return message;
            }
            selected_product.image = input;
            let message = [
                'The product image has been set to : '+ given_image
               ];

            return message;
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
            if(command.requireInput){
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