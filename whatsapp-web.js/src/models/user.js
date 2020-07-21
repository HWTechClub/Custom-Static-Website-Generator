
const {Website} = require('./website');

class User{

    constructor(id){
        this.id = id;
        //uses key value pair to store website
        //key is the companyName of the website
        //value is the website itself
        this.websites = {};
    }

    /**
     * 
     * @param {Website} website 
     */
    addWebsite(website){
        if(this.websites[website.companyName] != undefined)
        {
            return false;
        }else{
            this.websites[website.companyName] = website;
            return true;
        }
    }

    deleteWebsite(companyName){
        if(this.websites[companyName] != undefined)
        {
            return delete this.websites[companyName];
        }else{
            return false
        }
    }

    getWebsite(companyName){
        return this.websites[companyName];
    }

}

module.exports.User = User;