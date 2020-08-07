const fs = require('fs');

class Command{
    
    /**
     * 
     * @param {{string, function(),boolean}} param0 
     */
    constructor({command,callback, requireMedia = false}){
        this.command = command;
        this.callback = callback;
        this.requireMedia = requireMedia;
        this.requireInput = false;
        this.inputPos = [];
        this._requireInput();
    }

    /**
     * 
     * @param {string} message 
     */
    equals(message){
        let msg = message.trim();

        //check if the command is exactly equals to the msg
        //if mathces then return true
        //else if we check if the command requires an input
        //if not, then we return false
        if(this.command == msg){
            return true
        }else if(this.requireInput){
            //the command requires input


            let splitCommand = this.command.split(' ');
            let splitMsg = this._getSplitMessage(message);


            //check the number of words both has
            //if not same then return false
            //else iterate through all the words

            
            if(splitCommand.length == splitMsg.length)
            {
                for(let i = 0; i < splitMsg.length; i++)
                {
                    //if words matches then continue
                    //if the word is a input then continue
                    //else return false
                    if(splitMsg[i] == splitCommand[i]){
                        continue;
                    }else if(splitCommand[i].match(/[<>]/g) != null){
                        continue;
                    }else{
                        return false;
                    }
                }
                // all the words are matched to each other or to an input field
                return true;
            }
            //the message is not the same as the command
            return false;
        }
        return false;
    }

    /**
     * Only used in class
     * 
     * This determines if the command requires input
     * if the command has <inputName> in the string
     * then the command requires input
     */
    _requireInput(){
        if(this.requireMedia)
        {
            this.requireInput = true;
            return;
        }

        let msg = this.command;

        let matched = msg.match(/[<>]/g);

        this.requireInput = matched != null && matched.length > 1;
    }

    /**
     * returns an array of string representing the inputs of the command
     * @param {import("whatsapp-web.js").Message} message 
     */
    async getInput(message){
        
        if(this.requireMedia){
            
            return await this._getInputMedia(message);
        }else{

            return this._getInputMessage(message.body);
        }
    }
    
    /**
     * 
     * @param {string} msgString 
     */
    _getInputMessage(msgString){

        let input = {};
        let splitMsg = this._getSplitMessage(msgString);
        let splitCommand = this.command.split(' ');
        for(let i = 0; i < splitMsg.length; i++){
            if(splitCommand[i].startsWith('<')){
                let key = splitCommand[i].slice(1, splitCommand[i].length-1);
                input[key] = splitMsg[i];
            }
        }
        return input;

    }

    /**
     * 
     * @param {string} msg 
     */
    _getSplitMessage(msg){
        let split = msg.split(/['"]/g);
        if(split.length > 1)
        {
            let splitMsg = split[0].trim().split(' '); 
            let inputs = split.slice(1).filter( el => el.trim() == "" ? null : el);
            splitMsg = splitMsg.concat(inputs);  
            return splitMsg;
        }   

        return msg.split(' ');        
    }

    /**
     * 
     * @param {import("whatsapp-web.js").Message} message 
     */
    async _getInputMedia(message){
        let input = {};
        if(message.hasMedia){
            let media = await message.downloadMedia();
            input['media'] = media;
        }
        return input;
    }

}

module.exports.Command = Command;
