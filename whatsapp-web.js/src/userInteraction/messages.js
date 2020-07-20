
const { Command } =  require("./commands");
const { onWG } = require("../businessLogic/logic");

///////////
//add the commands here
///////////
const commands = [

    new Command({
        command: 'wg',
        message : [
            `stop it and get some help by using the following command *wg help*`,
            `Hope everything works well`
        ] ,
        callback : () => {  
            onWG();
        }
    }),

];



module.exports=  onMessage = (message, client) => {

    let command = null;

    //if the message start with wg then proceed
    if(message.body.startsWith("wg"))
    {
        for (let c of commands){
            if(c.getCommand() == message.body)
            {
                command = c;
                break;
            }
        }
    
        if(command != null){
            command.getCallback()();
            for (let msg of command.getMessage())
            {
                client.sendMessage(message.from, msg, new Object());
            }
        }
    }

};


//export default onMessage;