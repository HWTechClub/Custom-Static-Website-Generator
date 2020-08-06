const { Website } = require("../models/website");
const { data } = require("../models/data");
const { Product } = require('../models/product');
const { User } = require('../models/user');
const fs = require('fs');
const request = require('request');
const {stripIndents} = require('common-tags');

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


const check = ({checkFunction, callback}) => {

    let checkValue = checkFunction();
    //if check value is false
    if(checkValue == '')
    {
        return callback();
    }

    return checkValue;
}

const checkMediaExist = () => {
    if(input['media'] == undefined){
        return [
            `A media should be attached with the message`,
            `Please attach an image or file with the caption being the command`
        ];
    }

    return '';
}

const checkSelectedWebsiteExist= () => {

    if(user.getSelectedWebsite() == null)
    {
        return [
            `A website should be selected or created `,
            `To create website, please use the following command : `,
            `*wg create <company-name>*`,
        ];
    }

    return '';
}

const checkSelectedProductExist = () => {
    
    return check({
        checkFunction : checkSelectedWebsiteExist,
        callback : () => {
            if(user.getSelectedWebsite().getSelectedProduct() == null)
            {
                return [
                    `A product should be created or selected`
                ]
            }

            return '';
        }
    });
    
}

module.exports.setUser = (id) =>{

    if(!data.isUser(id))
    {
        
        data.addUser(new User(id));
    }
    user = data.getUser(id)
};

module.exports.setInput= (value) => {
    input = value;
}


module.exports.onCreateProduct = () => {

    return check({
        checkFunction : checkSelectedWebsiteExist,
        callback : () => {
            //add the product
            addProduct(input['id']);
            
            let selectedId = user.getSelectedWebsite().getSelectedProduct().id;
        
            //mesage to be sent to the user
            let message = [
                `The product has been created with the id : ${selectedId}`  ,
                //use stripIndents to strip the indentation 
                stripIndents`
                This product has been selected. 
                Now you can make change to the product with the following commands : 
                1. wg product info 
                2. wg product name <product-name> 
                3. wg product cost <product-cost> 
                4. wg product desc <product-desc> 
                5. wg product image *with an image attached*
                `
            ];
            
            return message;
        }
    });
        
}

module.exports.onDeleteProduct = () => {

    return check({
        checkFunction : checkSelectedWebsiteExist,
        callback : () => {

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
    });
}

module.exports.onSelectProduct = () => { 

    
    return check({
        checkFunction : checkSelectedWebsiteExist,
        callback : () => {

            if(!user.getSelectedWebsite().selectProduct(input['id']))
            {
                return [
                    `There was no product with the given id. Use the following command to get the list of all id's`,
                    `wg product all`
                ];
            }
        
            return [
                `The product has been selected with the id : ${user.getSelectedWebsite().getSelectedProduct().id}` ,
                stripIndents`
                This product has been selected. 
                Now you can make change to the product with the following commands : 
                1. wg product info 
                2. wg product name <product-name> 
                3. wg product cost <product-cost> 
                4. wg product desc <product-desc> 
                5. wg product image *with an image attached*
                `
            ];

        }
    });
}

module.exports.onGetAllProducts = () => {

    return check({
        checkFunction : checkSelectedWebsiteExist,
        callback : () => {
            let message = [
                'Your website has following products: '
            ];
        
            for(let p of user.getSelectedWebsite().getAllProduct())
            {
                let m = 'Product id: ' + p.id + '\nProduct Name : ' + p.name + '\nProduct description : '+ p.desc + '\nProduct Cost: ' + p.cost + '\nProduct Image : ';
                message.push(m);
                message.push(p.image);
            }
        
            return message;    
        }
    });
     
}

module.exports.onGetProductInfo = () => {
    
    return check({
        checkFunction : checkSelectedProductExist,
        callback : () => {
            let selected_product = user.getSelectedWebsite().getSelectedProduct();
            return [
                stripIndents`
                Product id: ${selected_product.id}
                Product Name : ${selected_product.name}
                Product description : ${selected_product.desc }
                Product Cost: ${selected_product.cost}
                Product Image :`,
                selected_product.image
            ];
        }
    });

}

module.exports.onSetProductName = () => {

    return check({
        checkFunction : checkSelectedProductExist,
        callback : () => {
            let selected_product = user.getSelectedWebsite().getSelectedProduct();
            selected_product.setName(input['product-name']);
            return [
                'The product name has been set to  '+ selected_product.name
            ];

        }
    });
}

module.exports.onSetProductCost = () => {
    return check ({
        checkFunction : checkSelectedProductExist,
        callback : () => {
            let selected_product = user.getSelectedWebsite().getSelectedProduct();
            selected_product.setCost(input['product-cost']);
            return[
                'The product cost has been set to  '+ selected_product.cost
            ];

        }
    });
}

module.exports.onSetProductDesc = () => {
    return check({
        checkFunction : checkSelectedProductExist,
        callback : () => {
            let selected_product = user.getSelectedWebsite().getSelectedProduct();
            selected_product.setDesc(input['product-desc']);
            let message = [
                'The product desc has been set to  '+ selected_product.desc
            ];
            return message;
        }
    });
}

module.exports.onSetProductImage = () => {

    return check({
        checkFunction : checkSelectedProductExist,
        callback : () => {

            return check({
                checkFunction : checkMediaExist,
                callback : () => {

                    let selected_product = user.getSelectedWebsite().getSelectedProduct();
                    selected_product.setImage(input['media']);
                    let message = [
                        'The product image has been set to the following image',
                        selected_product.image
                    ];
                    return message;

                }
            });
        }
    });
}

/**
 * A help function
 * @param {void} nothing
 * @return {help_signal} details on how to use the website
 */

module.exports.help = () =>
{
    let help_signal = [
        `Here are the following commands that can help you create your website`,
        `if you want to create a website use *wg create <company name>* and write the name of your company`,
        `if you already have a website us *wg website <company name>* to get access to the website`,
        `when creating your website you will be asked to give details of your company. To add these details you will have to write *wg website <firstName>* *wg website <lastName>* etc`,
        `If you want to check all the products that have already been created for your websit type *wg product all*`,
        `If you want to create a new product type *wg product new*`,
        `If you want to select a particular product for manipulating its data, give your product id as such: *wg product <id>`,
        `To get all information of the product you selected, type *wg product info*`,
        `To change the product name, type *wg product name <product-name>*`,
        `To change the product cost, type *wg product cost <product-cost>* `,
        `To change the product description, type *wg product desc <product-desc>*`,
        `To change the image of the product, type *wg product image <product-image>*`,
        `When you are done making your website and want to see it ,type *wg website finished*`,
        `If you want to delete a product, type *wg delete product<id>* where id is the product id`,
        `If you want to delete your whole website, type *wg delete website <company name>`,
        `That is all! Hope you make a great website~`
    ];

    return help_signal;
}

/**
 * wg create 
 * @param {string} input of the company name
 * @return {void} gives information on how to add details to website
 */
module.exports.onCreateWebsite = () =>
{
    user.addWebsite(new Website(input['company_name']));

    return [
        stripIndents`
        welcome to building your own website!
        We would like you add the following details:
        wg website firstname *<First_Name>*
        wg website lastname *<Last_Name>*
        wg website companyname *<Company_name>*
        wg website logo *<Logo_URL>*
        wg website banner *<Banner_URL>*
        wg website description *<Description>*
        wg website email *<Email>*
        For adding information use *wg website <firstname>*`
       
    ];
}


module.exports.onGetInfo = () => {
    

    return check({
        checkFunction : checkSelectedWebsiteExist,
        callback : () => {

            let website = user.getSelectedWebsite();
            return [
                stripIndents`
                First Name : ${website.firstName}
                Last Name : ${website.lastName}
                Company Name (id) : ${website.companyName }
                Description : ${website.desc}
                Email : ${website.email}
                Banner :`, 
                website.bannerUrl,
                `Logo :`,
                website.logo
            ];
        }
    });
}

/**
 *  wg website firstname
 * @param {string} input of the firstname for website
 * @return {void} informs you that first name has been added
 */
module.exports.onSetFirstName = () =>
{
    
    return check({
        checkFunction : checkSelectedWebsiteExist,
        callback : () => {

            user.getSelectedWebsite().firstName = input['firstName'];
       
            return [`First name has been set to ${user.getSelectedWebsite().firstName}`];
        }
    });


}

/**
 *  wg website lastname 
 * @param {string} input of the last name for website
 * @return {void} informs you that last name has been added
 */
module.exports.onSetLastName = () =>
{
    
    return check({
        checkFunction : checkSelectedWebsiteExist,
        callback : () => {

            user.getSelectedWebsite().lastName = input['lastName'];
    
            return [`Last name has been set to ${user.getSelectedWebsite().lastName}`];
        }
    });
}

/**
 *  wg website logo
 * @param {string} input of the logo URL for website
 * @return {void} informs you that logo URL has been added
 */

module.exports.onSetLogo = () =>
{    
    return check({
        //check if website exist
        checkFunction : checkSelectedWebsiteExist,
        callback: () => {

            return check({
                //check if media exist
                checkFunction: checkMediaExist,
                callback : () => {
                    user.getSelectedWebsite().logoUrl = input['media'];
            
                    return [
                        `Logo has been set to the following logo`,
                        user.getSelectedWebsite().logoUrl
                    ];
                }
            });
            
        }
    })

}


/**
 *  wg website banner
 * @param {string} input of the banner URL for website
 * @return {void} informs you that banner URL has been added
 */
module.exports.onSetBanner = () =>
{    
    return check({
        //check if website exist
        checkFunction : checkSelectedWebsiteExist,
        callback : () => {
            //check if media exist
            return check({
                checkFunction : checkMediaExist,
                callback :() => {

                    user.getSelectedWebsite().bannerUrl = input['media'];
                    return [
                        `Banner has been set to the following banner`,
                        user.getSelectedWebsite().bannerUrl
                    ];
                }
            })
        }
    });
}


/**
 *  wg website description
 * @param {string} input of the company description for website
 * @return {void} informs you that description has been added
 */
module.exports.onSetDesc = (descriptiondata) =>
{    
    return check({
        checkFunction : checkSelectedWebsiteExist,
        callback : () => {

            user.getSelectedWebsite().desc = input['desc'];
            return [`Banner has been set to ${user.getSelectedWebsite().desc}`];
        }
    });
}

/**
 *  wg website email
 * @param {string} input of the email for website
 * @return {void} informs you that email has been added
 * 
 */


module.exports.onSetEmail = () =>
{    
    return check({
        checkFunction : checkSelectedWebsiteExist,
        callback : () => {

            user.getSelectedWebsite().email = input['email'];
            return [`Email has been set to ${user.getSelectedWebsite().email}`];
        }
    });
}

module.exports.onWebsiteFinished = () => {
    return check({
        checkFunction : checkSelectedWebsiteExist,
        callback : async () => {
            //get json from the website
            let json = user.getSelectedWebsite().toJson();
            //creates a promise
            //resolve and reject value is going to be returned
            //resolve value = message to be sent
            let res = new Promise( (resolve, reject) => {
                request({
                    url: process.argv[2]+"/generate",
                    method: "POST",
                    headers: {
                        "content-type": "application/json",  // <--Very important!!!
                    },
                    body: json
                }, (error, response, body) => {
                    //send reject value in promise if error exist
                    if(error)
                    {
                        return reject(error);
                    }
                    // messsage to be sent
                    let returnStatement =  [
                        `${process.argv[2]}/pages/${JSON.parse(response.body).directory}`,
                        `*Website ID:* ${JSON.parse(response.body).directory}`,
                        `*Important to remember the ID*`
                    ];
                    //send resolve value id
                    resolve(returnStatement);
                });
            });

            //waits for request to be completed
            let msg = await res;
            return msg;
        }
    });
}

module.exports.onDeployWebsite = () => {
    return check({
        checkFunction: checkSelectedProductExist,
        callback : async () => {
            let res = new Promise( (resolve, reject) => {
                request({
                    url: process.argv[2]+"/ipfsdeploy?id="+user.getSelectedWebsite().companyName,
                    method: "GET",
                    headers: {
                        "content-type": "application/json",  // <--Very important!!!
                    }
                }, function (error, response, body){
                    // reject error in promise
                    if(error)
                    {
                        return reject(error);
                    }
                    // messsage to be sent
                    let returnStatement =  [
                        `https://ipfs.io/ipfs/${JSON.parse(response.body).data}`,
                        `Takes around 10-30 minutues to deploy`,
                        `Read more about IPFS https://ipfs.io/`
                    ];
                    //send resolve value id
                    resolve(returnStatement);
          
                });
            });

            let msg = await res;
            return msg;
            
        }
    });
}


const base64_decode = async (base64str, file) =>  {

    var bitmap = await Buffer.from(base64str, 'base64');
    await fs.writeFileSync(file, bitmap);
    console.log('****** File created from base64 encoded string ******');

}
