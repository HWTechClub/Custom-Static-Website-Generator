
const { Entity } = require('./entity');
const {Website} = require('./website');

class User{

    /**
     * 
     * @param {string} id 
     */
    constructor(id){
        this.id = id;
        this.websites = new Entity();
    }

    /**
     * 
     * @param {Website} website 
     */
    addWebsite(website){
        return this.websites.addData(website.companyName, website);
    }

    deleteWebsite(companyName){
        return this.websites.deleteData(companyName);
    }

    getWebsite(companyName){
        return this.websites.getData(companyName);
    }

    isWebsite(companyName){
        return this.websites.isData(companyName);
    }

    selectWebsite(companyName)
    {
        return this.websites.selectData(companyName);
    }

    /**
     * @returns {Website}
     */
    getSelectedWebsite(){
        return this.getWebsite(this.websites.selectedData);
    }

}

module.exports.User = User;