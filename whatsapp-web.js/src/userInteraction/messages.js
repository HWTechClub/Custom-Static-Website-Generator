
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
        command: 'wg website firstname <f_name>', 

        //function to be executed
        callback : (input) =>
        {  
            
            logic.onWG();
            
          inputting = input['f_name'];
           fname =  logic.fn();
           return fname;
            
        }
    }),

    new Command({
        //User command
        command: 'wg website lastname <l_name>', 

        
        //function to be executed
        callback : (input) =>
        {  
            
            logic.onWG();
            
            
 
                inputting = input['l_name'];
                
                lname =  logic.ln();
                return lname;
            
            
        }
    }),

    new Command({
        //User command
        command: 'wg website companyname <c_name>', 

        
        //function to be executed
        callback : (input) =>
        {  
            
            logic.onWG();
            
            
 
                inputting = input['c_name'];
                
                cname =  logic.cn();
                return cname;
            
            
        }
    }),

    new Command({
        //User command
        command: 'wg website logourl <logo_name>', 

        
        //function to be executed
        callback : (input) =>
        {  
            
            logic.onWG();
            
            
 
                inputting = input['logo_name'];
                
                logoURL =  logic.logo();
                return logoURL;
            
            
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