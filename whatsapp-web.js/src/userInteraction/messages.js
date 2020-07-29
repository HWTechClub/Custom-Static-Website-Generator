
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


    //gives user information on how to create website
    new Command({
        //User command
        
        command: 'wg help', 

        //function to be executed
        callback : (input) => {  

            logic.onWG();
            //mesage to be sent to the user
            get_help = logic.help();


            return get_help;
        }
    }),

    //helps user to create a website. The first step.
    new Command({
        //User command
        

        command: 'wg create <company_name>', 

        //function to be executed
        callback : (input) =>
         {  
            
            logic.onWG();
            
          data = input['company_name'];
           cn =  logic.comp(data);
           return cn;
            
        }
    }),
    
    //Inputs user's first name for website
    new Command({
        //User command
        
        command: 'wg website firstname <firstName>', 

        //function to be executed
        callback : (input) =>
         {  
            
            logic.onWG();
           
            //cdata = input['company'];
            fdata = input['firstName'];

           
           info =  logic.firstName(fdata);
           return info;
            
        }
    }),


    //inputs user last name in website
    new Command({
        //User command
        
        command: 'wg website lastname <lastname>', 

        //function to be executed
        callback : (input) =>
         {  
            
            logic.onWG();
           
            //cdata = input['company'];
            ldata = input['lastname'];

           
           info =  logic.lastName(ldata);
           return info;
            
        }
    }),


    //inputs user companyname;in case they want to update the name
    new Command({
        //User command
        
        command: 'wg website companyname <cname>', 

        //function to be executed
        callback : (input) =>
         {  
            
            logic.onWG();
           
            //cdata = input['company'];
            cdata = input['cname'];

           
           info =  logic.CompanyName_website(cdata);
           return info;
            
        }
    }),

    //inputs the logo of the company to website using url of logo
    new Command({
        //User command
        
        command: 'wg website logo <url>', 

        //function to be executed
        callback : (input) =>
         {  
            
            logic.onWG();
           
            //cdata = input['company'];
            logoU = input['url'];

           
           info =  logic.logourl(logoU);
           return info;
            
        }
    }),


    //inputs the banner for the company to website using url of banner
    new Command({
        //User command
        
        command: 'wg website banner <bannerURL>', 

        //function to be executed
        callback : (input) =>
         {  
            
            logic.onWG();
           
            bannerU = input['bannerURL'];

           
           info =  logic.bannerurl(bannerU);
           return info;
            
        }
    }),

    //inputs the description of the company to be seen in the website
    new Command({
        //User command
        
        command: 'wg website description <descript>', 

        //function to be executed
        callback : (input) =>
         {  
            
            logic.onWG();
           
            websiteDescription = input['descript'];

           
           info =  logic.company_description(websiteDescription);
           return info;
            
        }
    }),

    //inputs the email of the company for contacting.
    new Command({
        //User command
        
        command: 'wg website email <Email>', 

        //function to be executed
        callback : (input) =>
         {  
            
            logic.onWG();
           
            mail = input['Email'];

           
           info =  logic.email(mail);
           return info;
            
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