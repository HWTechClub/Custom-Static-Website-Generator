class Command{
    
    
    constructor({command, message, callback}){
        this.command = command;
        this.message = message;
        this.callback = callback;
    }
    
    getCommand(){
        return this.command;
    }
    
    getCallback(){
        return this.callback;
    }
    
    getMessage(){
        return this.message;
    }
}

module.exports.Command = Command;
