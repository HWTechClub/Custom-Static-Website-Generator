const { Entity } = require("./entity");
const { User } = require("./user");


class StructuredData {
    
    constructor() {
        this.entity = new Entity();
    }
    /**
     * Adds a user 
     * @param {User} user
     */
    addUser(user){
        return this.entity.addData(user.id, user);
    }
    
    /**
     * 
     * @param {number} id 
     * @returns {User}
     */
    getUser(id){
        return this.entity.getData(id);
    }
    
    /**
     * Delete the user with a specific id
     * @param {string} id 
     */
    deleteUser(id){
        return this.entity.deleteData(id)
    }

    /**
     * Check if a user with the given id exists
     * @param {string} id 
     */
    isUser(id){
        return this.entity.isData(id);
    }

    /**
     * Clears all the data stored
     */
    clearData(){
        this.entity.clearData();
    }
    
    
}

module.exports.data = new StructuredData();

/*
data structured:
data = {
    <id of user> : <Instance of User>,
    <id of user> : <Instance of User>
}
*/