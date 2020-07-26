
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
            get_help = logic.help();


            return get_help;
        }
    }),

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
    
    new Command({
        //User command
        
        command: 'wg website firstname <firstName>', 

        //function to be executed
        callback : (input) =>
         {  
            
            logic.onWG();
           
            //cdata = input['company'];
            fdata = input['firstName'];

           
           info =  logic.fn(fdata);
           return info;
            
        }
    }),

    //     new Command({
    //     //User command
    //     command: 'wg website firstname <f_name>', 

    //     //function to be executed
    //     callback : (input) =>
    //     {  
            
    //         logic.onWG();
            
    //       inputting = input['f_name'];
    //        fname =  logic.fn(input);
    //        return fname;
            
    //     }
    // }),
    new Command({
        //User command
        
        command: 'wg website lastname <lastname>', 

        //function to be executed
        callback : (input) =>
         {  
            
            logic.onWG();
           
            //cdata = input['company'];
            ldata = input['lastname'];

           
           info =  logic.ln(ldata);
           return info;
            
        }
    }),

    new Command({
        //User command
        
        command: 'wg website companyname <cname>', 

        //function to be executed
        callback : (input) =>
         {  
            
            logic.onWG();
           
            //cdata = input['company'];
            cdata = input['cname'];

           
           info =  logic.cn(cdata);
           return info;
            
        }
    }),

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

    // new Command({
    //     //User command
    //     command: 'wg website logo <logo_name>', 

        
    //     //function to be executed
    //     callback : (input) =>
    //     {  
            
    //         logic.onWG();
            
            
 
    //             inputting = input['logo_name'];
                
    //             logoURL =  logic.logo(input);
    //             return logoURL;
            
            
    //     }
    // }),

    //    new Command({
    //     //User command
        
    //     command: 'wg website <firstName> <lastname> <Cname>', 

    //     //function to be executed
    //     callback : (input) =>
    //      {  
            
    //         logic.onWG();
           
    //         //cdata = input['company'];
    //         fdata = input['firstName'];
    //         ldata = input['lastname'];
    //         cdata = input['Cname'];

           
    //        info =  logic.comdetails(fdata, ldata, cdata);
    //        return info;
            
    //     }
    // }),

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