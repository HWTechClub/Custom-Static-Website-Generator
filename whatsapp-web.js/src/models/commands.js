class Command{
    
    /**
     * 
     * @param {{string, function()}} param0 
     */
    constructor({command,callback}){
        this.command = command;
        this.callback = callback;
        this.requireInput = false;
        this.inputPos = [];
        this._requireInput();
        this._getInputPosition();
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
            let splitMsg = msg.split(' ');

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
                    }else if(splitCommand[i].match(/[<>]/g).length > 1){
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
        let msg = this.command;

        let matched = msg.match(/[<>]/g);

        this.requireInput = matched != null && matched.length > 1;
    }

    _getInputPosition(){
        let splitCommand = this.command.split(' ');
        let inputPos = [];
        for (let i = 0; i < splitCommand.length; i++)
        {
            if(splitCommand[i].startsWith('<')){
                inputPos.push(i);
            }
        }

        this.inputPos = inputPos;
    }

    /**
     * returns an array of string representing the inputs of the command
     * @param {string} message 
     */
    getInput(message){

        let splitMsg = message.split(' ');
        let input = [];
        for(let pos of this.inputPos){
            input.push(splitMsg[pos]);
        }

        return input;
    }

}

module.exports.Command = Command;
