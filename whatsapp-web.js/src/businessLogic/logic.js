const { Website } = require("../models/website");
const { data } = require("../models/data");

module.exports.onWG = () => {
    console.log('hello world');
}

module.exports.onCreate = (id, companyName) => {

    //get the user 
    let user = data.getUser(id);
    if(user == undefined)
    {
        data.addUser(id);
        user = data.getUser(id);
    }

    //add the website with the company name
    user.addWebsite(new Website(companyName));
}