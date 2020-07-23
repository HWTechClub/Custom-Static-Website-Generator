const { Website } = require("../models/website");
const { data } = require("../models/data");
const { Product } = require('../models/product');

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
module.exports.addProduct = (id,website) => {

    if(id==null)
    {
        // Setting up the product id if not given
        id = Math.floor((Math.random() * 100000) + 1);
        while(website.products.isData(id))// This is will check if the generated id is already used
        {
            id = Math.floor((Math.random() * 100000) + 1);
        }
    }

    // Create a product and select it. At this point all the product properties will be default including the id will be empty
    var product = new Product();
    product.id =id;
    // Add a product to the selected website. We will add the id based on the count of the products on the website
    website.addProduct(product);
    return product;
}
module.exports.deleteProduct = (id,website) => {

    return website.products.deleteData(id);
}

module.exports.deleteProduct = (id,website) => {
    return website.products.deleteData(id);
}