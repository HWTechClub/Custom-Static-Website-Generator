const { Website } = require("../models/website");
const { data } = require("../models/data");
const { Product } = require('../models/product');
const { User } = require('../models/user');

/**
 * user to be sent the message to
 * @type {User}
 */
let user = null;

/**
 * input to be used in the function if exists
 * @type {string}
 */
let input = null;

const addProduct = (id) => {

    // Create a product and select it.
    //At this point all the product properties will be default
    var product = new Product({id : id});
    // Add a product to the selected website.
    user.getSelectedWebsite().addProduct(product);
}

const checkSelectedWebsiteExist= () => {

    if(user.getSelectedWebsite() == null)
    {
        return [
            `A website should be selected or created 
            To create website, please use the following command : `,
            `*wg create <company-name>*`,

        ];
    }

    return '';
}

const checkSelectedProductExist = () => {
    if(user.getSelectedWebsite().getSelectedProduct() == null)
    {
        return [
            `A product should be created or selected`
        ]
    }
    
    return '';
    
}

module.exports.setUser = (id) =>{

    if(!data.isUser(id))
    {
        data.addUser(id);
    }
    user = data.getUser(id)
};

module.exports.setInput= (value) => {
    input = value;
}


module.exports.onCreateProduct = () => {

    let check = checkSelectedWebsiteExist();
    if(check)
    {
        //add the product
        addProduct(input['id']);
        
        let selectedId = user.getSelectedWebsite().getSelectedProduct().id;
    
        //mesage to be sent to the user
        let message = [
            `The product has been created with the id : ${selectedId}`  ,
            `
            This product has been selected. 
            Now you can make change to the product with the following commands : 
            1. wg product info 
            2. wg product name <product-name> 
            3. wg product cost <product-cost> 
            4. wg product desc <product-desc> 
            5. wg product image <product-image>
            `
        ];
        
        return message;
    }
    return check;
}

module.exports.onDeleteProduct = () => {

    
    let check = checkSelectedWebsiteExist();
    if(check)
    {
    
        if(!user.getSelectedWebsite().deleteProduct(input['id']))
        {
            return [
                `No product with the given id`
            ];
        }
    
        return [
            `The product has been deleted with the id : ` + input['id']
        ];
    
    }

    return check;
}

module.exports.onSelectProduct = () => { 


    let check = checkSelectedWebsiteExist();
    if(check)
    {
        // Find the product with the given id
        if(!user.getSelectedWebsite().selectProduct(input['id']))
        {
            return [
                `There was no product with the given id. Use the following command to get the list of all id's`,
                `wg product all`
            ];
        }
    
        return [
            `The product has been selected with the id : ${user.getSelectedWebsite().getSelectedProduct()}` ,
            `
            This product has been selected. 
            Now you can make change to the product with the following commands : 
            1. wg product info 
            2. wg product name <product-name> 
            3. wg product cost <product-cost> 
            4. wg product desc <product-desc> 
            5. wg product image <product-image>
            `
        ];
    }

    return check;
}

module.exports.onGetAllProducts = () => {

    
    let check = checkSelectedWebsiteExist();
    if(check)
    {
        let message = [
            'Your website has following products: '
        ];
    
        for(let p of user.getSelectedWebsite().getAllProduct())
        {
            let m = 'Product id: ' + p.id + '\nProduct Name : ' + p.name + '\nProduct description : '+ p.desc + '\nProduct Cost: ' + p.cost + '\nProduct Image : '+ p.image;
            message.push(m);
        }
    
        return message;    
    }

    return check;
     
}

module.exports.onGetProductInfo = () => {
    
    
    let check = checkSelectedWebsiteExist();
    if(check)
    {
        let check = checkSelectedProductExist();
        if(check)
        {
            let selected_product = user.getSelectedWebsite().getSelectedProduct();
            return [
                `
                Product id: ${selected_product.id}
                Product Name : ${selected_product.name}
                Product description : ${selected_product.desc }
                Product Cost: ${selected_product.cost}
                Product Image : ${selected_product.image}
                `
            ];
        }
    }
    return check;


}

module.exports.onSetProductName = () => {
    let check = checkSelectedWebsiteExist();
    if(check)
    {
        let check = checkSelectedProductExist();
        if(check)
        {
            let selected_product = user.getSelectedWebsite().getSelectedProduct();
            selected_product.setName(input['product-name']);
            let message = [
                'The product name has been set to  '+ selected_product.name
            ];
            return message;
        }
    }
    
    return check;
}

module.exports.onSetProductCost = () => {
    let check = checkSelectedWebsiteExist();
    if(check)
    {
        let check = checkSelectedProductExist();
        if(check)
        {
            let selected_product = user.getSelectedWebsite().getSelectedProduct();
            selected_product.setCost(input['product-cost']);
            let message = [
                'The product cost has been set to  '+ selected_product.cost
                ];
            return message;
        }
    }

    return check;
}

module.exports.onSetProductDesc = () => {
    let check = checkSelectedWebsiteExist();
    if(check)
    {
        let check = checkSelectedProductExist();
        if(check)
        {
            let selected_product = user.getSelectedWebsite().getSelectedProduct();
            selected_product.setDesc(input['product-desc']);
            let message = [
                'The product cost has been set to  '+ selected_product.desc
            ];
            return message;
        }
    }
    return check;
}

module.exports.onSetProductImage = () => {
    let check = checkSelectedWebsiteExist();
    if(check)
    {
        let check = checkSelectedProductExist();
        if(check)
        {
            let selected_product = user.getSelectedWebsite().getSelectedProduct();
            selected_product.setImage(input['product-image']);
            let message = [
                'The product cost has been set to  '+ selected_product.image
            ];
            return message;
        }
    }
    return check;
}


