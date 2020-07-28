
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
        callback : (input) => {  

            if(selected_website==null)
            {
                let message = [
                    `A website should be selected or created before creating a product `
                 ];
                return message;
            }
            selected_product= logic.addProduct(input['id'],selected_website);
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
        command: `wg product delete <id>`,

        //function to be executed
        callback : (input) => {  

            if(selected_website==null)
            {
                let message = [
                    `A website should be selected or created before deleting  a product `
                 ];
                return message;
            }

            if(logic.deleteProduct(input['id'],selected_website) == false)
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
        command: `wg product select <id>`,

        //function to be executed
        callback : (input) => {  

            if(selected_website==null)
            {
                let message = [
                    `A website should be selected or created before selecting a product `
                 ];
                return message;
            }
            // Find the product with the given id
            selected_product = selected_website.getProduct(input['id']);
            if(selected_product == null)
            {
                logic.addProduct(input['id'],selected_website);
                selected_product = selected_website.getProduct(input['id']);
                let message = [
                    `There was no product with the give id. So a new product was created and selected with the id : ` + selected_product.id ,
                    `Now you can make change to the product with the following commands : \n1. wg product info \n2. wg product name <product-name> \n3. wg product cost <product-cost> \n4. wg product desc <product-desc> \n5. wg product image <product-image>`
                ];
                
                return message;
            }

            let message = [
                `The product has been selected with the id : ` + selected_product.id ,
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

            if(selected_website==null)
            {
                let message = [
                    `A website should be selected or created `
                 ];
                return message;
            }
            let message = [
                'Your website has following products: '
            ];
            for(let p of selected_website.getAllProduct())
            {
                let m = 'Product id: ' + p.id + '\nProduct Name : ' + p.name + '\nProduct description : '+ p.desc + '\nProduct Cost: ' + p.cost + '\nProduct Image : '+ p.image;
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

            if(selected_product == null)
            {
                let message = [
                    `A product should be selected `
                 ];
                return message;
            }
            let message = [
                'Product id: ' + selected_product.id,
                'Product Name : ' + selected_product.name ,
                'Product description : '+ selected_product.desc ,
                'Product Cost: ' + selected_product.cost ,
                'Product Image : '+ selected_product.image
               ];

            return message;
        }
    }),
    new Command({
        //User command
        command: `wg product name <product-name>`,

        //function to be executed
        callback : (input) => {  

            if(selected_product == null)
            {
                let message = [
                    `A product should be selected `
                 ];
                return message;
            }
            selected_product.setName(input['product-name']);
            let message = [
                'The product name has been set to  '+ selected_product.name
               ];

            return message;
        }
    }),
    new Command({
        //User command
        command: `wg product cost <product-cost>`,

        //function to be executed
        callback : (input) => {  

            if(selected_product == null)
            {
                let message = [
                    `A product should be selected `
                 ];
                return message;
            }
            selected_product.setCost(input['product-cost']);
            let message = [
                'The product cost has been set to  '+ selected_product.cost
               ];

            return message;
        }
    }),
    new Command({
        //User command
        command: 'wg product desc <product-desc>',

        //function to be executed
        callback : (input) => {  

            if(selected_product == null)
            {
                let message = [
                    `A product should be selected `
                 ];
                return message;
            }
            selected_product.setDesc(input['product-desc']);
            let message = [
                'The product description has been set to : '+ selected_product.desc
               ];

            return message;
        }
    }),
    new Command({
        //User command
        command: 'wg product image <product-image>',

        //function to be executed
        callback : (input) => {  

            if(selected_product == null)
            {
                let message = [
                    `A product should be selected `
                 ];
                return message;
            }
            selected_product.setImage(input['product-image']);
            let message = [
                'The product image has been set to : '+ selected_product.image
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
                input = command.getInput(message.body);
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