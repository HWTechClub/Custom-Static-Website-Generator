const { Website } = require("../models/website");
const { data } = require("../models/data");
const { Product } = require('../models/product');
const { User } = require('../models/user');
const fs = require('fs');
const request = require('request');
const {stripIndents} = require('common-tags');

/**
 * user to be sent the message to
 * @type { User }
 */
let user = null;

/**
 * input to be used in the function if exists
 * @type {string}
 */
let input = null;


const base64_decode = async (base64str, file) =>  {

    var bitmap = await Buffer.from(base64str, 'base64');
    await fs.writeFileSync(file, bitmap);
    console.log('****** File created from base64 encoded string ******');

}


const saveImage = async (messageMedia, fileName) => {
    let file = `../website-generator/public/images/${fileName}.jpg`;
    await base64_decode(messageMedia.data, file);
    return `../../images/${fileName}.jpg`;
}

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
                    `There was no product with the given id. Use the following command to get the list of all products`,
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
                callback : async () => {

                    let selected_product = user.getSelectedWebsite().getSelectedProduct();
                    selected_product.setImage(input['media']);
                    //filename to be set
                    let filename = `${user.id.slice(3,10)}${user.getSelectedWebsite().companyName}${selected_product.id}`;
                    //url for the image that are saved
                    selected_product.imageUrl = await saveImage(input['media'], filename);

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
        `NOTE : text between '<>' are replaceable.`,
        `NOTE : Sentences needs to be between qoutes. For Example "I am a bot" `,
        `*wg create <company_name> Create a website with the given company_name*`,
        `*wg website select <company_name>* Selects a website if exists`,
        `*wg website firstname <firstName>* Sets the firstname`,
        `*wg website lastname <lastName>* Sets the firstname`,
        `*wg website logo (with an image attached)* Sets the logo`,
        `*wg website banner (with an image attached)* Sets the banner`,
        `*wg website desc <description>* Sets the description`,
        `*wg website email <email>* Sets the email`,
        `*wg website finished* Completes and creates the website`,
        `*wg product new <id>* Creates a new product with an id`,
        `*wg product select <id>* Selects a product with a given id`,
        `*wg product all* Shows all the products`,
        `*wg product info* Shows the information of the selected product`,
        `*wg product name <name>* Sets the name of the product`,
        `*wg product desc <description>* Sets the description of the product`,
        `*wg product cost <cost>* Sets the cost of the product`,
        `*wg product image (with an image attached)* Sets the image of the product`,
    ];

    return help_signal;
}

module.exports.onSelectWebsite = () => {

    if(user.isWebsite(input['company_name']))
    {
        user.selectWebsite(input['company_name']);
        return [`Website with the company name *${user.getSelectedWebsite().companyName}* is selected`]
    }

    return [`No website with the company name *${input['company_name']}* has been selected`];


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
        `A website with the company name *${user.getSelectedWebsite().companyName}* is created`,
        stripIndents`
        wg website firstname *<First_Name>*
        wg website lastname *<Last_Name>*
        wg website logo *with an image attached*
        wg website banner *with an image attached*
        wg website desc *<Description>*
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
                website.banner,
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
                callback : async () => {

                    user.getSelectedWebsite().logo = input['media'];
                    user.getSelectedWebsite().logoUrl = await saveImage(input['media'], `${user.id.slice(3,10)}${user.getSelectedWebsite().companyName}logo`);
                    
                    return [
                        `Logo has been set to the following logo`,
                        user.getSelectedWebsite().logo
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
                callback : async () => {

                    user.getSelectedWebsite().banner = input['media'];
                    user.getSelectedWebsite().bannerUrl = await saveImage(input['media'], `${user.id.slice(3,10)}${user.getSelectedWebsite().companyName}banner`);
                    
                    return [
                        `Banner has been set to the following banner`,
                        user.getSelectedWebsite().banner
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
            return [`Description has been set to ${user.getSelectedWebsite().desc}`];
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
        checkFunction: checkSelectedWebsiteExist,
        callback : async () => {
            let res = new Promise( (resolve, reject) => {
                request({
                    url: process.argv[2]+"/ipfsdeploy?id="+ user.getSelectedWebsite().companyName,
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


