const { User } = require("../models/user");
const { Website } = require("../models/website");

module.exports.data = new StructuredData();

class StructuredData {
    
    constructor() {
        this.data={};
    }

    addUser(id){
        if(this.data[id] != undefined)
        {
            this.data[id] = new User(id);
            return true
        }

        return false;
    }

    /**
     * 
     * @param {number} id 
     * @returns {User}
     */
    getUser(id){
        return this.data[id];
    }

    deleteUser(id){
        if(this.data[id] != undefined)
        {
            return delete this.data[id];
            
        }

        return false;
    }


}

/*
data structured:
data = {
    <id of user> : <Instance of User>,
    <id of user> : <Instance of User>
}
*/